import express from 'express';
import dotenv from 'dotenv';
import { client } from './drizzle/db';
import { user } from './routes/auth.routes';
import { category } from './routes/category.route';

dotenv.config();

const app = express();
const port = process.env.PORT 

// Basic middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'API Server',
    timestamp: new Date().toISOString() 
  });
});


user(app);
category(app);

// Database health check endpoint
app.get('/db-health', async (req, res) => {
  try {
    // Simple query to test database connection
    const result = await client.query('SELECT NOW()');
    res.json({ 
      status: 'ok',
      message: 'Database connection is healthy',
      timestamp: new Date().toISOString(),
      serverTime: result.rows[0].now
    });
  } catch (error) {
    console.error('Database health check failed:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Database connection failed',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Initialize server
app.listen(port, () => {
  console.log(`
 Server is running on port ${port}
 Health check: http://localhost:${port}/health
 DB Health check: http://localhost:${port}/db-health
  `);
});

// Handle graceful shutdown
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

async function gracefulShutdown(signal: string) {
  console.log(`\n${signal} received. Starting graceful shutdown...`);
  
  try {
    // Close database connection if it's open
    await client.end();
    console.log('✅ Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
}