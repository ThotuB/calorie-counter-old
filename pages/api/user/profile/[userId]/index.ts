import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import { getDb } from 'utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;

    if (typeof userId !== 'string') {
        res.status(400).json({ message: 'Invalid user id' });
        return;
    }

    try {
        const db = await getDb('users');
        const collection = db.collection('profile');

        if (req.method === 'GET') {
            const result = await collection.findOne({ uid: userId });

            if (!result) {
                res.status(404).json({ message: 'Profile not found' });
                return;
            }

            res.status(200).json(result);
            return;
        }

        if (req.method === 'PUT') {
            const { name, email, phone, image, website, bio, gender, isAdmin } = req.body;

            const fields = _.omitBy({ name, email, phone, image, website, bio, gender, isAdmin }, _.isUndefined);

            await collection.updateOne({ uid: userId }, { $set: fields }, { upsert: true });

            res.status(200).json({ message: 'Profile updated' });
            return;
        }

        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
