import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from 'utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = await getDb('recipes');
        const collection = db.collection('recipes');

        if (req.method === 'GET') {
            const { pageNumber, pageSize, userId } = req.query;
            const page = parseInt(pageNumber as string, 10) || 0;
            const size = parseInt(pageSize as string, 10) || 10;

            const filter = userId ? { 'user.id': userId as string } : {};

            const result = await collection
                .find(filter)
                .skip(page > 0 ? (page - 1) * size : 0)
                .limit(size)
                .toArray();
            const total = await collection.countDocuments(filter);

            res.status(200).json({
                entries: total,
                pages: Math.ceil(total / size),
                recipes: result.map((recipe) => {
                    return {
                        id: recipe._id.toString(),
                        name: recipe.name,
                        description: recipe.description,
                        image: recipe.image,
                        approved: recipe.approved,
                        user: {
                            id: recipe.user.id,
                            name: recipe.user.name,
                            image: recipe.user.image
                        }
                    };
                })
            });
            return;
        }

        if (req.method === 'POST') {
            const result = await collection.insertOne(req.body);

            res.status(201).json({
                message: 'Recipe added',
                id: result.insertedId.toString()
            });
            return;
        }

        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
