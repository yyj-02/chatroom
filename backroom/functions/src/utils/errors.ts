import {FunctionsErrorCode} from "firebase-functions/v1/https";

class UnauthorizedError extends Error {
  code: FunctionsErrorCode;
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
    this.code = "permission-denied";
  }
}

class InternalServerError extends Error {
  code: FunctionsErrorCode;
  constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
    this.code = "internal";
  }
}

class TokenVerificationError extends Error {
  originalError: any;
  code: FunctionsErrorCode;
  constructor(originalError: any) {
    super("Error verifying ID token");
    this.name = "TokenVerificationError";
    this.originalError = originalError;
    this.code = ["auth/id-token-revoked", "auth/user-disabled"].includes(
      originalError.code
    ) ?
      "permission-denied" :
      "internal";
  }
}

class DatabaseError extends Error {
  originalError: any;
  code: FunctionsErrorCode;
  constructor(originalError: any) {
    super("Error adding message to database");
    this.name = "DatabaseError";
    this.originalError = originalError;
    this.code = "internal";
  }
}

class BadRequestError extends Error {
  code: FunctionsErrorCode;
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
    this.code = "invalid-argument";
  }
}

class TranslationError extends Error {
  code: FunctionsErrorCode;
  constructor(message: string) {
    super(message);
    this.name = "TranslationError";
    this.code = "internal";
  }
}

export {
  UnauthorizedError,
  InternalServerError,
  TokenVerificationError,
  DatabaseError,
  BadRequestError,
  TranslationError,
};
