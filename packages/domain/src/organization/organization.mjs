export class Organization {
  constructor({ id, name, status = "active" }) {
    if (!id || typeof id !== "string") throw new Error("organization id is required");
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      throw new Error("organization name must contain at least 2 characters");
    }
    if (!["active", "suspended"].includes(status)) {
      throw new Error("organization status is invalid");
    }

    this.id = id;
    this.name = name.trim();
    this.status = status;
  }

  suspend() {
    if (this.status === "suspended") return;
    this.status = "suspended";
  }

  activate() {
    this.status = "active";
  }
}
