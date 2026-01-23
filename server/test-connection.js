const mysql = require('mysql2/promise');

async function test() {
  console.log('🔍 Testing Railway MySQL Connection...');
  
  const config = {
    host: 'yamanote.proxy.rlwy.net',
    port: 10481,
    user: 'root',
    password: 'uRbXnNyAUvTvxZIsbPFbaiPgEYIVhRfJ',
    database: 'railway',
    ssl: { rejectUnauthorized: false },
    connectTimeout: 10000
  };

  try {
    const connection = await mysql.createConnection(config);
    console.log('✅ Connected successfully!');
    
    const [rows] = await connection.query('SELECT DATABASE() as db, VERSION() as version');
    console.log('Database:', rows[0].db);
    console.log('MySQL Version:', rows[0].version);
    
    await connection.end();
    return true;
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    return false;
  }
}

test();