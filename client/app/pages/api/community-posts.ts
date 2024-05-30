// pages/api/community-posts.ts
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('your-database-name');
  const posts = await db.collection('community-posts').find({}).toArray();

  res.status(200).json({ posts });
}
