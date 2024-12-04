interface HTTPRequestInfo {
  requestMethod: string;
  requestUrl: string;
  requestBody?: any;
  remoteIp: any;
  userAgent: string | undefined;
}

interface LoggerData {
  logName?: string;
  userInformation?: Record<string, any>;
  message: string;
  fncName?: string;
  stack?: string;
  httpRequest?: HTTPRequestInfo;
}

interface HTTPRequestObject {
  requestMethod: string;
  requestUrl: string;
  requestBody?: any;
  remoteIp: any;
  userAgent: string;
}

export { LoggerData, HTTPRequestObject };
