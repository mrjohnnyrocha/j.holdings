// pages/api/group-chats.ts
import { getSession } from 'next-auth/react';
import clientPromise from '../../clients/mongodb';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const client = await clientPromise;
  const db = client.db('your-database-name');
  const chats = await db.collection('group-chats').find({ userId: session.user.id }).toArray();

  res.status(200).json({ chatIds: chats.map(chat => chat._id) });
}
