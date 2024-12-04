import { app } from "./app";

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || "not set";

export function startServer() {
  return app.listen(PORT, () =>
    console.log(`Server with PID(${process.pid}) and NODE_ENV(${NODE_ENV}) is listening on: ${PORT}!`)
  );
}
