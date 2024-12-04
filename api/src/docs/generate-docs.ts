import fs from "fs";
import { swaggerDocs } from "./swagger";

fs.writeFileSync("./swagger-docs.json", JSON.stringify(swaggerDocs, null, 2), "utf-8");
