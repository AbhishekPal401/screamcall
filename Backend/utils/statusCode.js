export const STATUS_CODES = {
  OK: 200, // This Status indicates the Successful HTTP request
  CREATED: 201, // This Status indicates that a new resource has been created
  NON_AUTHORITATIVE_CONTENT: 203, // This Status indicates that There is no authoritative content available to send
  NO_CONTENT: 204, // This Status indicates that All is good but nothing to return
  NOT_MODIFIED: 304, // This Status indicates that resource are the same since the last visit
  BAD_REQUEST: 400, // This Status indicates that incorrect syntax or invalid URLs
  UN_AUTHORIZED: 401, // This Status indicates that the client should authenticate itself before making request
  FORBIDDEN: 403, // This Status indicates that the client is authenticated but doesn't have permission to access the resource
  NOT_FOUND: 404, // This Status indicates that the requested URL is not valid
  INTERNAL_SERVER_ERROR: 500, //This Status indicates that An unexpected situation occurs which server can'nt handle at this moment
}
