import type { Request, Response, NextFunction } from "express";

export async function authHandler(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  return next();
}
