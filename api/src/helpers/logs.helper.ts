import { LOGGER_SEVERITY_LEVELS } from "../constants/logger.constant";
import type { HTTPRequestObject, LoggerData } from "../models/interfaces/logger.interface";

/**
 * Get function name from error stack
 * @param error
 * @returns
 */
function getFunctionName(error: string) {
  let functionName = "";

  try {
    const splitStack = error
      .split("at ")
      .filter(
        line =>
          !line.includes("Error") &&
          !line.includes("Layer") &&
          !line.includes("next") &&
          !line.includes("Route") &&
          !line.includes("TypeError")
      )
      .map(line => line.substring(0, line.indexOf("(")).trim())
      .filter(line => line.length > 0);
    functionName = splitStack[0];

    if (functionName?.includes("async")) {
      functionName = functionName.replace("async", "").trim();
    }
  } catch (e) {
    // Do nothing
  }

  return functionName;
}

/**
 * Write a log in GCP with 'severity' and 'data'
 * @param severity
 * @param data
 */
async function writeLog(severity: string, data: any) {
  console.log(
    JSON.stringify({
      severity,
      ...data
    })
  );
}

function writeMessage(severity: string, data: LoggerData) {
  try {
    const { message, fncName, stack = undefined, httpRequest = undefined } = data;

    let functionName = fncName;
    if (!fncName && stack) {
      functionName = getFunctionName(stack);
    }

    const logMessage = {
      message,
      function: functionName,
      stack,
      httpRequest
    };

    writeLog(severity, logMessage);
  } catch (e) {
    // Do nothing
  }
}

/**
 * Write an INFO log
 * @param data
 */
function writeInfo(data: LoggerData) {
  writeMessage(LOGGER_SEVERITY_LEVELS.INFO, data);
}

/**
 * Write a DEBUG log
 * @param data
 */
function writeDebug(data: LoggerData) {
  writeMessage(LOGGER_SEVERITY_LEVELS.DEBUG, data);
}

/**
 * Write a WARNING log
 * @param data
 */
function writeWarning(data: LoggerData) {
  writeMessage(LOGGER_SEVERITY_LEVELS.WARNING, data);
}

/**
 * Write an ERROR log
 * @param data
 */
function writeError(data: LoggerData) {
  writeMessage(LOGGER_SEVERITY_LEVELS.ERROR, data);
}

/**
 * Build HTTP request information adding the body if present
 * @param req
 * @param body
 * @returns
 */
function buildHTTPRequest(req: any, body?: any) {
  const httpRequest: HTTPRequestObject = {
    requestMethod: req.method,
    requestUrl: req.originalUrl,
    remoteIp: req.ip,
    userAgent: req.get("User-Agent")
  };

  if (body) {
    httpRequest.requestBody = body;
  }

  return httpRequest;
}

export { writeInfo, writeDebug, writeError, writeWarning, buildHTTPRequest };
