const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const isRealUri = (uri) => {
  if (!uri) return false;
  // Must be a real atlas or local URI — not the placeholder
  if (uri.includes('YOUR_USERNAME') || uri.includes('YOUR_PASSWORD') || uri.includes('YOUR_CLUSTER')) return false;
  if (uri.startsWith('mongodb+srv://') || uri.startsWith('mongodb://')) return true;
  return false;
};

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return; // Already connected
  }

  const MONGO_URI = process.env.MONGO_URI;

  // ── MODE 1: Real MongoDB (Atlas or local) ──────────────────────────
  if (isRealUri(MONGO_URI)) {
    try {
      console.log('\n🔄 Connecting to MongoDB Atlas...');
      const conn = await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
      });
      console.log('');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✅  MongoDB Atlas Connected!');
      console.log(`📦  Database : ${conn.connection.name}`);
      console.log(`🌐  Host     : ${conn.connection.host}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      return;
    } catch (err) {
      console.error('\n❌ Atlas connection failed:', err.message);
      console.error('⚠️  Falling back to In-Memory database...\n');
    }
  }

  // ── MODE 2: In-Memory MongoDB (Development Fallback) ──────────────
  try {
    if (!mongoServer) {
      mongoServer = await MongoMemoryServer.create();
    }
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });

    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🟡  In-Memory MongoDB Running (Dev Mode)');
    console.log('💡  Data resets on server restart.');
    console.log('📌  To persist data, set MONGO_URI in .env');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } catch (innerErr) {
    console.error('❌ Fatal: Cannot start any database:', innerErr.message);
    process.exit(1);
  }
};

// Connection event listeners
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected.');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅  MongoDB reconnected!');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  if (mongoServer) await mongoServer.stop();
  console.log('🛑  MongoDB connection closed.');
  process.exit(0);
});

module.exports = connectDB;
