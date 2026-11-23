import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from 'utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const { uid } = req.body;
    const { token } = req.query;

    if (token !== 'secret') {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    if (typeof uid !== 'string' || !uid) {
        res.status(400).json({ message: 'Invalid user id' });
        return;
    }

    try {
        const db = await getDb('users');
        const collection = db.collection('admin');

        await collection.updateOne({ uid }, { $set: { uid } }, { upsert: true });

        res.status(201).json({ message: 'Admin added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
