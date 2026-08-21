export class ObjectStorageError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = "ObjectStorageError";
    this.cause = cause;
  }
}

export class ObjectStoragePort {
  async put(_object) {
    throw new Error("ObjectStoragePort.put must be implemented by an adapter");
  }

  async get(_objectKey) {
    throw new Error("ObjectStoragePort.get must be implemented by an adapter");
  }

  async head(_objectKey) {
    throw new Error("ObjectStoragePort.head must be implemented by an adapter");
  }
}
