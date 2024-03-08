import { AppError } from "./appError";

export class NotFoundError extends AppError {
  constructor(public message: string, public status: number = 404) {
    super(message, status);
  }
}