import { Router } from "express";
import { asyncHandler } from "../middleware/async.middleware";
import { getHealth } from "../controllers/health.controller";

const router: Router = Router()

/**
 * @swagger
 * tags:
 *  name: Health
 *  description: Test health of API
 * 
 */

/**
 * @swagger
 * /health:
 *  get:
 *    summary: Check the health of the application
 *    tags: [Health]
 *    responses:
 *      200:
 *        description: The application is healthy
 */
router.get("/", asyncHandler(getHealth))
  
export { router as healthRouter };
