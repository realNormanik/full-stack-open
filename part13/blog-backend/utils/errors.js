// Error with an HTTP status, answered as { "error": "<message>" }.
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  };
};

// Validation error with a list of messages, answered as { "error": ["...", "..."] }.
class ValidationError extends Error {
  constructor(messages) {
    const list = Array.isArray(messages) ? messages : [messages];

    super(list.join(", "));
    this.name = "ValidationError";
    this.messages = list;
  };
};

module.exports = { HttpError, ValidationError };
