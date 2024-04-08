class UnauthorizedError extends Error {
  code: number;
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
    this.code = 401;
  }
}

class InternalServerError extends Error {
  code: number;
  constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
    this.code = 500;
  }
}

class TokenVerificationError extends Error {
  originalError: any;
  code: number;
  constructor(originalError: any) {
    super("Error verifying ID token");
    this.name = "TokenVerificationError";
    this.originalError = originalError;
    this.code = ["auth/id-token-revoked", "auth/user-disabled"].includes(
      originalError.code
    ) ?
      401 :
      500;
  }
}

class DatabaseError extends Error {
  originalError: any;
  code: number;
  constructor(originalError: any) {
    super("Error adding message to database");
    this.name = "DatabaseError";
    this.originalError = originalError;
    this.code = 500;
  }
}

export {
  UnauthorizedError,
  InternalServerError,
  TokenVerificationError,
  DatabaseError,
};
