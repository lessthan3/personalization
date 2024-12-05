// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express, { type Application, type Request, type Response, type NextFunction } from "express";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cors, { type CorsOptions } from "cors";
import { json, text, urlencoded } from "body-parser";

import { mainRouter } from "./routers/main.router";
import { errorHandler } from "./middleware/error.middleware";
import { headerHandler } from "./middleware/header.middleware";
import { swaggerDocs, swaggerUi } from "./docs/swagger";

// Create express instance
const app: Application = express();

// Configure CORS for local development
if (process.env.ENVIRONMENT === "LOCAL") {
  const whitelist: string[] = ["http://localhost:3000", "http://localhost:8080"];
  const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  };
  app.use(cors(corsOptions));
  app.use(morgan("dev"));
}

// Middleware configuration
app
  .use(compression())
  .use(helmet())
  .use(json({ limit: "5mb" }))
  .use(text({ limit: "5mb" }))
  .use(urlencoded({ extended: true, limit: "5mb" }))
  .use(headerHandler);

// API documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Main API routes
app.use("/api/v1", mainRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

// Disable x-powered-by header for added security
app.disable("x-powered-by");

export { app };
