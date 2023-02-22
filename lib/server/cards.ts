import FlashCard from '#/types/FlashCard';
import * as mongoDB from 'mongodb';
import { connectToDatabase } from './db';

const COLLECTION_NAME = 'cards';

export async function getAllCards() {
  const db = await connectToDatabase();
  const cardCollection: mongoDB.Collection = db.collection(COLLECTION_NAME);
  const cards = (await cardCollection.find({}).toArray()) as FlashCard[];
  return cards;
}

export async function createCard(newCard: FlashCard) {
  const db = await connectToDatabase();
  const cardCollection: mongoDB.Collection = db.collection(COLLECTION_NAME);
  const createResult = await cardCollection.insertOne(newCard);

  const query = { _id: createResult.insertedId };

  const newlyCreated = await cardCollection.findOne(query);
  return newlyCreated;
}

export async function deleteCard({ _id }: { _id: string }) {
  const db = await connectToDatabase();
  const cardCollection: mongoDB.Collection = db.collection(COLLECTION_NAME);
  const deleteResult = await cardCollection.deleteOne({
    _id: new mongoDB.ObjectId(_id),
  });
  return;
}
