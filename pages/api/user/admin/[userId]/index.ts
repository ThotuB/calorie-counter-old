import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from 'utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const { userId } = req.query;

    if (typeof userId !== 'string') {
        res.status(400).json({ message: 'Invalid user id' });
        return;
    }

    try {
        const db = await getDb('users');
        const collection = db.collection('admin');

        const result = await collection.findOne({ uid: userId });

        res.status(200).json({ isAdmin: result !== null });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
