/**
 * EXPRESS SERVER ENTRY POINT
 * 
 * This is the main server file that orchestrates the entire backend:
 * - Sets up Express middleware (JSON parsing, URL encoding, logging)
 * - Registers all API routes (Dashboard, Prioritization, Impact Tracker)
 * - Configures Vite dev server (development) or static file serving (production)
 * - Starts HTTP server on port 5000 (or PORT environment variable)
 * 
 * MIDDLEWARE PIPELINE:
 * 1. JSON body parser with raw body capture (for webhooks)
 * 2. URL-encoded form data parser
 * 3. Request/response logging for API calls
 * 4. API routes registration
 * 5. Error handler
 * 6. Vite dev server (dev) OR static file server (production)
 * 
 * SERVER CONFIGURATION:
 * - Port 5000 is the only non-firewalled port (serves both API and frontend)
 * - Uses reusePort for zero-downtime restarts
 * - Binds to 0.0.0.0 for external accessibility
 */

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// EXTENDED TYPE DEFINITIONS
// Augment Express Request to include raw body (needed for webhook signature verification)
declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}

// MIDDLEWARE: JSON body parser with raw body preservation
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));

// MIDDLEWARE: URL-encoded form data parser
app.use(express.urlencoded({ extended: false }));

// MIDDLEWARE: Request/response logging for API endpoints
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  // Intercept res.json to capture response body for logging
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  // Log API requests after response finishes
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      // Truncate long log lines to keep terminal clean
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// SERVER INITIALIZATION
(async () => {
  // Register all API routes (defined in routes.ts)
  const server = await registerRoutes(app);

  // MIDDLEWARE: Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // ENVIRONMENT-SPECIFIC SERVING STRATEGY
  // Development: Vite dev server with HMR (Hot Module Replacement)
  // Production: Serve pre-built static files from /public directory
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // START HTTP SERVER
  // IMPORTANT: Port 5000 is the only port accessible externally (Replit firewall)
  // This single port serves both API endpoints and frontend assets
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0", // Bind to all network interfaces
    reusePort: true, // Allow multiple processes to bind to same port (zero-downtime restarts)
  }, () => {
    log(`serving on port ${port}`);
  });
})();
