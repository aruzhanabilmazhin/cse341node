import mongodb from 'mongodb';

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('DB already initialized');
    return callback(null, _db);
  }

  mongodb.MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      _db = client.db();
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
