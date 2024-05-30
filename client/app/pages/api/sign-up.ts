import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import fetch from 'node-fetch';
import 'node-fetch';
declare global {
  namespace NodeJS {
    interface Global {
      fetch: typeof globalThis.fetch;
    }
  }
}

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB!;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY!;

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

const verifyReCAPTCHA = async (token: string) => {
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
  });
  const data = await response.json();
  return data.success;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, firstName, lastName, companyName, captchaToken } = req.body;

  if (!captchaToken || !(await verifyReCAPTCHA(captchaToken))) {
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