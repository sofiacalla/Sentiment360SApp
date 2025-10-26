/**
 * DATABASE CONNECTION SETUP
 * 
 * This file establishes the connection to the PostgreSQL database using:
 * - Neon Serverless PostgreSQL (WebSocket-based connection)
 * - Drizzle ORM for type-safe database queries
 * 
 * ARCHITECTURE:
 * - Uses connection pooling for efficient resource usage
 * - Configured with WebSocket support for serverless environments
 * - Imports full schema for type inference across the application
 * 
 * EXPORTS:
 * - pool: PostgreSQL connection pool
 * - db: Drizzle database instance (used throughout the app for queries)
 */

import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure Neon to use WebSocket for serverless compatibility
neonConfig.webSocketConstructor = ws;

// Validate DATABASE_URL environment variable exists
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Create PostgreSQL connection pool with Neon
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Initialize Drizzle ORM with the pool and schema
export const db = drizzle({ client: pool, schema });
