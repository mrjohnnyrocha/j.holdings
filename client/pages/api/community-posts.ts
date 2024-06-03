import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../clients/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('your-database-name');
  const posts = await db.collection('community-posts').find({}).toArray();
  res.status(200).json(posts);
}
