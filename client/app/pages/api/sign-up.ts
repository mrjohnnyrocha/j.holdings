import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import fetch from 'node-fetch';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;
const FRIENDLY_CAPTCHA_API_KEY = process.env.FRIENDLY_CAPTCHA_API_KEY;
const FRIENDLY_CAPTCHA_SITE_KEY = process.env.FRIENDLY_CAPTCHA_SITE_KEY;

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  if (!MONGODB_URI) throw new Error('MONGODB_URI is not defined');
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

const verifyFriendlyCaptcha = async (solution: string) => {
  const response = await fetch(`https://api.friendlycaptcha.com/api/v1/siteverify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      solution,
      secret: FRIENDLY_CAPTCHA_API_KEY,
      sitekey: FRIENDLY_CAPTCHA_SITE_KEY
    })
  });
  const data = await response.json();
  return data.success;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, firstName, lastName, companyName, captchaToken } = req.body;

  if (!captchaToken || !(await verifyFriendlyCaptcha(captchaToken))) {
    return res.status(400).json({ error: 'Invalid CAPTCHA' });
  }

  const client = await connectToDatabase();
  const db = client.db(MONGODB_DB);
  
  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  await db.collection('users').insertOne({
    email,
    password,
    firstName,
    lastName,
    companyName,
    createdAt: new Date(),
  });

  return res.status(201).json({ message: 'User created successfully' });
};