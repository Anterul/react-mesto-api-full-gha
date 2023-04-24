const Card = require('../models/card');
const { OK, CREATED } = require('../utils/http2Constants');
const BadRequest = require('../utils/errors/BadRequest'); // 400
const Forbidden = require('../utils/errors/Forbidden'); // 403
const NotFound = require('../utils/errors/NotFound'); // 404

module.exports.getCards = (req, res, next) => {
  Card.find({}).sort({ _id: -1 }).limit(100)
    .populate(['owner', 'likes'])
    .then((cards) => res.status(OK).send(cards))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user })
    .then((card) => res.status(CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (card === null) {
        throw new NotFound('Карточка с указанным _id не найдена.');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new Forbidden('Вы не можете удалить карточку друго пользователя');
      }
      return card.deleteOne().then(() => res.status(OK).send(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для удаления карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) {
        throw new NotFound('Передан несуществующий _id карточки.');
      }
      return res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для постановки лайка.'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) {
        throw new NotFound('Передан несуществующий _id карточки.');
      }
      return res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для снятия лайка.'));
      } else {
        next(err);
      }
    });
};
