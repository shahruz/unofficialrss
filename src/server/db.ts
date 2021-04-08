import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL as string;

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('autoIndex', true);

const readyStates = {
  disconnected: 0,
  connected: 1,
  connecting: 2,
  disconnecting: 3,
};

let pendingPromise: Promise<typeof mongoose> | null;

const connectDB = async () => {
  const { readyState } = mongoose.connection;

  if (readyState === readyStates.connected) {
    return;
  } else if (pendingPromise) {
    await pendingPromise;
    return;
  }
  pendingPromise = mongoose.connect(MONGO_URL);
  try {
    await pendingPromise;
  } finally {
    pendingPromise = null;
  }
};

export default connectDB;
