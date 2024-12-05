/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Error message"
 *     InternalServerError:
 *       type: object
 *       properties:
 *          message:
 *           type: string
 *           description: Error message indicating something is wrong with server
 *           example: "Internal Server Error"
 *     UnauthorizedError:
 *       type: string
 *       description: Error message indicating authentication header is missing
 *       example: "Unauthorized"    
 *     GeneralErrorResponseError:
 *       type: object
 *       properties:
 *         error:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message indicating that something was wrong with the request
 *               example: "Something was wrong"         
 */
