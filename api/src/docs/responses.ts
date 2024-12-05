/**
 * @swagger
 * components:
 *   responses:
 *     BadRequestResponse:
 *       description: Bad Request
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                error:
 *                  $ref: '#/components/schemas/ErrorResponse'
 *     InternalServerErrorResponse:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                error:
 *                  $ref: '#/components/schemas/InternalServerError'
 *     NotFoundResponse:
 *       description: Not Found
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                error:
 *                  $ref: '#/components/schemas/ErrorResponse'
 *     UnauthorizedErrorResponse:
 *       description: Unauthorized to get api response
 *       content:
 *         text/plain:
 *           schema:
 *             $ref: '#/components/schemas/UnauthorizedError'
 *     GeneralErrorResponse:
 *       description: Something was wrong in the request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GeneralErrorResponseError'
 */
