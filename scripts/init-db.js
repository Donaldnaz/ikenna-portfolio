const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function initDb() {
  const sql = neon(process.env.DATABASE_URL);
  
  console.log('Creating comments table...');
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Table "comments" created successfully!');
  } catch (error) {
    console.error('Error creating table:', error);
    process.exit(1);
  }
}

initDb();
