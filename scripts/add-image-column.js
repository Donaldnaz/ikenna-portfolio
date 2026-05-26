const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function updateDb() {
  const sql = neon(process.env.DATABASE_URL);
  
  console.log('Adding image_url column to comments table...');
  try {
    await sql`
      ALTER TABLE comments ADD COLUMN IF NOT EXISTS image_url TEXT;
    `;
    console.log('Column "image_url" added successfully!');
  } catch (error) {
    console.error('Error updating table:', error);
    process.exit(1);
  }
}

updateDb();
