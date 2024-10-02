import Env from "../../lib/Env/env.js";

const parser = new Env(); // Create an instance of Env

/*
|==========================================================================
| Available validators as rules:
| - required (when this rule is set, the key must exist in the environment variables)
| - string (when this rule is set, the value must be a string)
| - number (when this rule is set, the value must be a number)
| - boolean (when this rule is set, the value must be a boolean)
| - array (when this rule is set, the value must be an array)
| - ipv4 (when this rule is set, the value must be an ipv4 address i.e. 127.0.0.1)
| - ipv6 (when this rule is set, the value must be an ipv6 address i.e. ::1 or 2001:0db8:85a3:0000:0000:8a2e:0370:7334)
| - url (when this rule is set, the value must be a valid url)
| - uri (when this rule is set, the value must be a valid uri i.e. mongodb://localhost:27017/dbname)
| - email (when this rule is set, the value must be a valid email address)
| - unsigned (when this rule is set, the value must be an unsigned number)
| - integer (when this rule is set, the value must be an integer)
| - float (when this rule is set, the value must be a float)
|==========================================================================
*/

export const config = {
  PORT: parser.get("PORT", ["integer", "unsigned"], 5000 /* default-value */),
  HOST: parser.get("HOST", ["ipv4"], "0.0.0.0" /* default-value */),
  MONGODBURI: parser.get("MONGODB_URI", ["required", "uri"]), // required one, throws error if not found

  // Email/NodeMailer configuration
  EMAILSERVICEUSER: parser.get("EMAIL_SERVICE_USER", ["required", "email"]), // required
  EMAILSERVICEPASS: parser.get("EMAIL_SERVICE_PASS", ["required", "string"]), // required
  EMAILSERVICEHOST: parser.get(
    "EMAIL_SERVICE_HOST",
    ["string"],
    "smtp.gmail.com"
  ),
  EMAILSERVICEPORT: parser.get(
    "EMAIL_SERVICE_PORT",
    ["integer", "unsigned"],
    587
  ),
  JWT_SECRET: parser.get("JWT_SECRET", ["string"]),
};
