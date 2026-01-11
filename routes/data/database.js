import mongodb from 'mongodb';

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('DB already initialized');
    return callback(null, _db);
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return callback(new Error('MONGODB_URI is not defined in .env'));
  }

  mongodb.MongoClient.connect(uri)
    .then((client) => {
      _db = client.db();
      console.log('MongoDB connected');
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error('Db not initialized');
  }
  return _db;
};

export default {
  initDb,
  getDb
};
