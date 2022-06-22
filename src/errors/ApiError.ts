export abstract class ApiError extends Error {
    abstract statusCode: number;
    message :string;
    constructor(message: string) {
      super(message);
      this.message = message;
    }

    serializeError(): string {
      return this.message;
    }
}
