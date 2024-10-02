/**
 * Env. variable parser
 * @module lib/Env
 * @requires dotenv
 */
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

// Defined rule-set
const RULES = [
  "required",
  "string",
  "number",
  "boolean",
  "array",
  "ipv4",
  "ipv6",
  "url",
  "uri",
  "email",
  "unsigned",
  "integer",
  "float",
];

// Env class
class Env {
  constructor() {
    this.raw = { ...process.env }; // Raw environment variables as key-value data only
  }

  get(
    key, // string (required)
    rules = ["required"], // string[] (optional)
    defaultValue = null // default value (optional)
  ) {
    // Check if key is provided and is a valid key
    if (!key || typeof key !== "string") {
      throw new Error("Invalid key provided!");
    }

    // Check if the given rules are valid
    if (rules.length >= 1 && rules.some((rule) => !RULES.includes(rule))) {
      throw new Error("Invalid rules provided!");
    }

    // Check if the key exists in the environment variables when 'required' is set
    if (rules.includes("required") && !this.raw[key]) {
      throw new Error(`Environment variable ${key} is required!`);
    }

    // Check if the key is not required and not exists in the environment variables
    if (!this.raw[key]) return defaultValue;

    // Validate the value based on the rules
    const value = this.raw[key];
    rules.forEach((rule) => {
      if (rule === "required") return; // Skip 'required' rule
      this[rule](value); // Validate the value
    }); // Throw error if any validation fails

    return value; // If everything is fine, return the value
  }

  // Validate: string
  string = (ctx) => {
    if (typeof ctx !== "string" || ctx.length === 0) {
      throw new Error("Invalid string provided!");
    }
    ctx = ctx.trim(); // Remove leading and trailing spaces
  };

  // Validate: number
  number = (ctx) => {
    ctx = Number(ctx);
    if (typeof ctx !== "number" || isNaN(ctx)) {
      throw new Error("Invalid number provided!");
    }
  };

  // Validate: boolean
  boolean = (ctx) => {
    if (typeof ctx !== "boolean") {
      throw new Error("Invalid boolean provided!");
    }
    ctx = ctx === "true" || ctx === true;
  };

  // Validate: array
  array = (ctx) => {
    if (typeof ctx === "string") ctx = ctx.split(",");
    if (!Array.isArray(ctx)) throw new Error("Invalid array provided!");
  };

  // Validate: ipv4
  ipv4 = (ctx) => {
    const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipv4Regex.test(ctx)) throw new Error("Invalid ipv4 address provided!");

    const blocks = ctx.split(".");
    if (
      blocks.some((block) => parseInt(block) > 255) ||
      blocks.length !== 4 ||
      blocks.some((block) => block.length > 1 && block.startsWith("0")) ||
      blocks.some((block) => parseInt(block) < 0) ||
      blocks.some((block) => isNaN(block))
    ) {
      throw new Error("Invalid ipv4 address provided!");
    }
  };

  // Validate: ipv6
  ipv6 = (ctx) => {
    const ipv6Regex = /^(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/;
    if (!ipv6Regex.test(ctx)) throw new Error("Invalid ipv6 address provided!");

    const blocks = ctx.split(":");
    if (
      blocks.some((block) => block.length > 4) ||
      blocks.length !== 8 ||
      blocks.some((block) => parseInt(block, 16) < 0) ||
      blocks.some((block) => isNaN(parseInt(block, 16)))
    ) {
      throw new Error("Invalid ipv6 address provided!");
    }
  };

  // Validate: url
  url = (ctx) => {
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(ctx)) throw new Error("Invalid url provided!");
  };

  // Validate: uri
  uri = (ctx) => {
    const uriRegex = /^[^ "]+$/;
    if (!uriRegex.test(ctx)) throw new Error("Invalid uri provided!");

    const parts = ctx.split("://");
    if (parts.length !== 2) throw new Error("Invalid uri provided!");
    const [protocol, rest] = parts;
    if (!protocol || !rest) throw new Error("Invalid uri provided!");

    const userInfoSplit = rest.split("@");
    const hostPart =
      userInfoSplit.length > 1 ? userInfoSplit[1] : userInfoSplit[0];

    const [hostAndPort] = hostPart.split("/");
    const [hostname, port] = hostAndPort.split(":");

    if (!hostname) throw new Error("Invalid uri provided!");
    if (port && (isNaN(port) || port < 1 || port > 65535))
      throw new Error("Invalid port provided!");
  };

  // Validate: email
  email = (ctx) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(ctx)) throw new Error("Invalid email provided!");
  };

  // Validate: unsigned
  unsigned = (ctx) => {
    this.number(ctx);
    if (ctx < 0) throw new Error("Invalid unsigned number provided!");
  };

  // Validate: integer
  integer = (ctx) => {
    this.number(ctx);
    if (!Number.isInteger(Number(ctx)))
      throw new Error("Invalid integer provided!");
  };

  // Validate: float
  float = (ctx) => {
    this.number(ctx);
    if (!Number.isFinite(Number(ctx)))
      throw new Error("Invalid float provided!");
  };
}

// Export the Env class
export default Env;
