const { Client } = require('pg');
require('dotenv').config();
const client = new Client({ connectionString: process.env.DATABASE_URL || 'postgres://gweru:gweru_pass@localhost:5432/gweru_poly' });

async function run() {
  await client.connect();
  await client.query(`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) UNIQUE,
      display_name VARCHAR(150),
      password_hash TEXT,
      role VARCHAR(30) NOT NULL,
      is_verified BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS content (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title VARCHAR(255),
      description TEXT,
      file_url TEXT,
      content_type VARCHAR(50),
      created_at TIMESTAMP DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS device_sync_logs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      device_id VARCHAR(255),
      user_id UUID,
      payload JSONB,
      synced BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS payments (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID,
      provider VARCHAR(50),
      amount_minor BIGINT,
      currency VARCHAR(10),
      provider_txn_id VARCHAR(255),
      status VARCHAR(50),
      created_at TIMESTAMP DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS tokens (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID,
      balance BIGINT DEFAULT 0,
      updated_at TIMESTAMP DEFAULT now()
    );
  `);
  console.log('Migrations applied');
  await client.end();
}

run().catch(err=>{ console.error(err); process.exit(1); });
