import { startServer } from "./server";

//only for development
async function main(params: ReadonlyArray<string>) {
  startServer();
}

main([]).catch(err => console.error(err));
