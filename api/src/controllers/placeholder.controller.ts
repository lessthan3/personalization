import { Request, Response, NextFunction } from "express";
import { buildHTTPRequest, writeInfo } from "../helpers/logs.helper";

async function doSomething(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.body;

    writeInfo({
      fncName: "doSomething",
      message: `Doing something with ${id}`,
      httpRequest: buildHTTPRequest(req, req.body)
    });

    // const response = await serviceFunction(id);

    // return res.status(response.code).json(response.result);
  } catch (error) {
    next(error);
  }
}

export { doSomething };
