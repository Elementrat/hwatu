import { ObjectId } from 'mongodb';

export default class FlashCard {
  constructor(
    public _id?: ObjectId | string,
    public creatorID?: ObjectId | string,
    public front?: string,
    public back?: string,
    public richTest?: string,
  ) {}
}
