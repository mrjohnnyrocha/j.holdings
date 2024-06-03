import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { message, chatId } = req.body;

  // Simulate processing and responding to the chat message
  const responseMessage = `Received your message: ${message}`;

  res.status(200).json({ message: responseMessage });
};
