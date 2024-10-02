import { config } from "./EnvVariables/env-config.js";
import { dbConnection } from "./database-config.js";
const {
  PORT,
  HOST,
  MONGODBURI,
  EMAILSERVICEHOST,
  EMAILSERVICEPORT,
  EMAILSERVICEUSER,
  EMAILSERVICEPASS,
  JWT_SECRET,
} = config;

import { transport } from "./email-config.js";

export {
  //env variables
  PORT,
  HOST,
  MONGODBURI,
  EMAILSERVICEHOST,
  EMAILSERVICEPORT,
  EMAILSERVICEUSER,
  EMAILSERVICEPASS,
  JWT_SECRET,

  //methods
  dbConnection,
  transport,
};
