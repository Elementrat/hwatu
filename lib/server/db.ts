import * as mongoDB from 'mongodb';

const DB_CONNECTION_STRING = process.env.MONGODB_URI || '';
const DB_NAME = 'hwatu';

let client: mongoDB.MongoClient;

export async function connectToDatabase() {
  client = new mongoDB.MongoClient(DB_CONNECTION_STRING);
  await client.connect();
  const db: mongoDB.Db = client.db(DB_NAME);
  return db;
}
