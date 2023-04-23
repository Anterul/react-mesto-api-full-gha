const http2 = require('node:http2');

const OK = http2.constants.HTTP_STATUS_OK; // 200
const CREATED = http2.constants.HTTP_STATUS_CREATED; // 201
const BAD_REQUEST = http2.constants.HTTP_STATUS_BAD_REQUEST; // 400
const UNAUTHORIZED = http2.constants.HTTP_STATUS_UNAUTHORIZED; // 401
const FORBIDDEN = http2.constants.HTTP_STATUS_FORBIDDEN; // 403
const NOT_FOUND = http2.constants.HTTP_STATUS_NOT_FOUND; // 404
const CONFLICT = http2.constants.HTTP_STATUS_CONFLICT; // 409
const INTERNAL_SERVER_ERROR = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR; // 500

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
};
