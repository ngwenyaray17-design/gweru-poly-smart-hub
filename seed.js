const { Client } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const client = new Client({ connectionString: process.env.DATABASE_URL || 'postgres://gweru:gweru_pass@localhost:5432/gweru_poly' });

async function seed() {
  await client.connect();
  console.log('Seeding DB...');

  const pwCreator = await bcrypt.hash('RayStrongPass!23', 10);
  const pwAdmin = await bcrypt.hash('AdminPass!23', 10);
  const pwStudent = await bcrypt.hash('Student1Pass!23', 10);

  await client.query(`INSERT INTO users (email, display_name, password_hash, role, is_verified, created_at)
    VALUES ($1,$2,$3,$4,true,now()) ON CONFLICT (email) DO NOTHING`, ['ray@dreamer.example','Ray The Dreamer', pwCreator, 'creator']);

  await client.query(`INSERT INTO users (email, display_name, password_hash, role, is_verified, created_at)
    VALUES ($1,$2,$3,$4,true,now()) ON CONFLICT (email) DO NOTHING`, ['admin@gweru.ac.zw','Gweru Admin', pwAdmin, 'institution_admin']);

  await client.query(`INSERT INTO users (email, display_name, password_hash, role, is_verified, created_at)
    VALUES ($1,$2,$3,$4,true,now()) ON CONFLICT (email) DO NOTHING`, ['student1@gweru.ac.zw','Student One', pwStudent, 'student']);

  await client.query(`INSERT INTO content (title, description, file_url, content_type) VALUES
    ($1,$2,$3,$4)`, ['Applied Mechanics Past Paper 2019','Past paper example','https://example.com/am2019.pdf','past_paper']);

  console.log('Seed complete.');
  await client.end();
}

seed().catch(err=>{ console.error(err); process.exit(1); });
