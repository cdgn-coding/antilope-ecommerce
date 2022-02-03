import { config } from "dotenv";
import path from "path";
config({ path: path.resolve(__dirname, ".env") });

import { populateProducts } from "./products";
populateProducts(1);
