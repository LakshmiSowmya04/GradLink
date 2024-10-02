import { createTransport } from "nodemailer";
import { nodemailerOptions } from "../lib/constant/nodemaileroptions.js";
export const transport = createTransport({
  ...nodemailerOptions,
  logger: true, // Enable logging
  debug: true, // Show debug output
});
