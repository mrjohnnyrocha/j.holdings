import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import clientPromise from '../../clients/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const client = await clientPromise;
  const db = client.db('your-database-name');
  const chats = await db.collection('group-chats').find({}).toArray();
  res.status(200).json(chats);
}
