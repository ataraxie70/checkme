export class ObjectStorageError extends Error {
  constructor(message, { cause, operation } = {}) {
    super(message, { cause });
    this.name = "ObjectStorageError";
    this.operation = operation;
  }
}

export class ObjectStoragePort {
  async put(_key, _body, _options) {
    throw new Error("ObjectStoragePort.put must be implemented by an adapter");
  }

  async get(_objectKey) {
    throw new Error("ObjectStoragePort.get must be implemented by an adapter");
  }

  async head(_objectKey) {
    throw new Error("ObjectStoragePort.head must be implemented by an adapter");
  }

  async ping() {
    throw new Error("ObjectStoragePort.ping must be implemented by an adapter");
  }
}
