import type { Request, Response, NextFunction } from "express";
import axios, { type AxiosError } from "axios";
import { ProjectError } from "../models/interfaces/error.interface";
import { writeError } from "../helpers/logs.helper";

export function errorHandler(
  error: Error | AxiosError | ProjectError | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let code = 500;

  const response = {
    error: {
      message: "Unknown Error"
    }
  };

  if (axios.isAxiosError(error)) {
    code = Number((error?.response?.data as any)?.code);
    response.error.message = (error.response?.data as any)?.data?.reason;
    if (!code && !response.error.message) {
      code = Number(error?.response?.status) || 500;
      response.error.message = (error?.response?.data as any)?.detail || error.message;
    }
  } else if (error instanceof ProjectError) {
    code = error?.code || 500;
    response.error.message = error.message;
  } else if (error instanceof Error) {
    response.error.message = error.message;
  }

  writeError({
    message: response.error.message,
    stack: error.stack,
    httpRequest: {
      requestMethod: req.method,
      requestUrl: req.originalUrl,
      remoteIp: req.ip,
      userAgent: req.get("User-Agent")
    }
  });

  return res.status(code).json(response);
}
