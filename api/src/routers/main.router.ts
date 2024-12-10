import express, { type Router } from "express";
import { authHandler } from "../middleware/auth.middleware";
import { healthRouter } from "./health.router";

// For reference(REST API Guide):
// https://www.restapitutorial.com/
// https://www.restapitutorial.com/lessons/restfulresourcenaming.html
// https://www.restapitutorial.com/lessons/httpmethods.html

const router: Router = express
  .Router()
  .use("/health", healthRouter)
  .use(authHandler)
  
export { router as mainRouter };
