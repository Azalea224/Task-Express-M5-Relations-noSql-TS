import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validatePostTitle = [
  body("title")
    .isLength({ max: 40 })
    .withMessage("Title must be under 40 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Title must contain only letters"),
  
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

