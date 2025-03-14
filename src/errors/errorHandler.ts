export class ErrorHandler extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'Error';
    this.status = status;
  }
}

export class NotFound extends ErrorHandler {
  constructor(message: string) {
    super(message, 404);
    this.name = 'Not Found';
  }
}

export class BadRequest extends ErrorHandler {
  constructor(message: string) {
    super(message, 400);
    this.name = 'Bad Request';
  }
}
