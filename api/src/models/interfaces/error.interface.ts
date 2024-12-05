export class ProjectError extends Error {
  code?: number;
  constructor(message?: string | undefined, code?: number) {
    super(message);
    this.code = code;
  }
}
