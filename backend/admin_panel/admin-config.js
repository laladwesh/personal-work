import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import dotenv from "dotenv";
import Service from "../models/serviceModel.js";
dotenv.config();

// Admin panel root path (use the example's path)
const ADMINPANELROOT = process.env.ADMINPANELROOT || "/admin";

// Admin credentials must be set via environment variables
const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL || "g.avinash@iitg.ac.in",
  password: process.env.ADMIN_PASS || "admin",
};



// Log configured admin email presence (don't print password)
console.log("[admin-config] DEFAULT_ADMIN.email=", DEFAULT_ADMIN.email || "(not set)");
if (!DEFAULT_ADMIN.email || !DEFAULT_ADMIN.password) {
  console.log(
    "[admin-config] WARNING: ADMIN_EMAIL or ADMIN_PASSWORD not set. Set these in your .env to enable admin login."
  );
}

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const authenticate = async (email, password) => {
  // Basic normalization
  const inputEmail = (email || "").trim();
  const inputPassword = password || "";

  // Masked log for debugging
  const maskedPwd = inputPassword ? "******" : "(empty)";
  console.log(`[admin-config] login attempt email="${inputEmail}", password=${maskedPwd}`);

  // If admin credentials not configured, reject early
  if (!DEFAULT_ADMIN.email || !DEFAULT_ADMIN.password) {
    console.log("[admin-config] admin login failed: ADMIN_EMAIL or ADMIN_PASSWORD not configured");
    return null;
  }

  // Compare normalized email (case-insensitive) and exact password
  if (inputEmail.toLowerCase() === (DEFAULT_ADMIN.email || "").toLowerCase() && inputPassword === DEFAULT_ADMIN.password) {
    console.log("[admin-config] admin login: success");
    return DEFAULT_ADMIN;
  }

  // Helpful debug messages
  console.log(`[admin-config] admin login failed: configured="${DEFAULT_ADMIN.email}", submitted="${inputEmail}"`);
  if (inputPassword !== DEFAULT_ADMIN.password) {
    console.log("[admin-config] admin login failed: password mismatch");
  }

  return null;
};

const adminOptions = {
  resources: [Service],
  branding: {
    companyName: process.env.ADMIN_COMPANY_NAME || "Shivalik Graphics",
    logo: false,
    withMadeWithLove: false,
  },
  rootPath: ADMINPANELROOT,
  loginPath: ADMINPANELROOT + "/login",
  logoutPath: ADMINPANELROOT + "/logout",
};

const admin = new AdminJS(adminOptions);

// Build authenticated router using environment-configured cookie settings
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate,
    cookieName: process.env.COOKIE_NAME || "adminjs",
    cookiePassword: process.env.COOKIE_PASSWORD || "sessionsecret",
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_PASSWORD || "sessionsecret",
  }
);

try {
  admin.watch();
} catch (err) {
  // non-fatal
}

export { admin, adminRouter };
