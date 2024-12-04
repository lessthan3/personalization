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

import express, { type Application } from "express";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors, { type CorsOptions } from "cors";
import { mainRouter } from "./routers/main.router";
import { errorHandler } from "./middleware/error.middleware";
import { headerHandler } from "./middleware/header.middleware";
import { swaggerDocs, swaggerUi } from "./docs/swagger";

//express
const app: Application = express();

if (process.env.ENVIRONMENT === "LOCAL") {
  // cors => disable in production
  const whitelist = ["http://localhost:3000", "http://localhost:3000/#/", "http://localhost:8080"];
  const corsOptions: CorsOptions = {
    origin: (origin: any, callback: any) => {
      if (whitelist.indexOf(origin) !== -1) callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  };
  app.use(cors(corsOptions));
  app.use(morgan("dev"));
}

app
  .use(bodyParser.json())
  .use(compression())
  .use(helmet())
  .use(
    express.json({
      limit: "5mb"
    })
  )
  .use(
    express.text({
      limit: "5mb"
    })
  )
  .use(
    express.urlencoded({
      extended: true,
      limit: "5mb"
    })
  )
  .use(headerHandler)
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  .use("/api/v1", mainRouter)
  .use(errorHandler)
  .disable("x-powered-by");

export { app };
