
import { Request, Response, NextFunction } from "express";

async function getHealth(req: Request, res: Response, next: NextFunction) {
  try {    
    return res.status(200).json({ 'health': 'Ok' });
  } catch (error) {
    console.log('error', error)
    next(error);
  }
}

export { getHealth }

