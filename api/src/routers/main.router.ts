import express, { Router } from "express";
import { authHandler } from "../middleware/auth.middleware";

// For reference(REST API Guide):
// https://www.restapitutorial.com/
// https://www.restapitutorial.com/lessons/restfulresourcenaming.html
// https://www.restapitutorial.com/lessons/httpmethods.html

const router: Router = express.Router().use(authHandler);

export { router as mainRouter };
