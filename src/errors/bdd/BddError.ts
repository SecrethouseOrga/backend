export class BddError extends Error {
  entityName :string;
  message :string;

  constructor(entityName: string, message: string) {
    super(message);
    this.entityName = entityName;
    this.message = message;
  }

  serializeError(): string {
    return this.message;
  }
}
