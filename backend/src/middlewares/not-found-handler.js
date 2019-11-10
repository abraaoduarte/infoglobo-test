import { NotFound } from 'httperrors';

export default function handler(req, res, next) {
  next(new NotFound(`Requested url [${req.originalUrl}] was not found!`));
}
