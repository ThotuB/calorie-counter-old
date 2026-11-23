import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import { getDb } from 'utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { recipeId } = req.query;

    if (typeof recipeId !== 'string' || !ObjectId.isValid(recipeId)) {
        res.status(400).json({ message: 'Invalid recipe id' });
        return;
    }

    const _id = new ObjectId(recipeId);

    try {
        const db = await getDb('recipes');
        const collection = db.collection('recipes');

        if (req.method === 'GET') {
            const result = await collection.findOne({ _id });

            if (!result) {
                res.status(404).json({ message: 'Recipe not found' });
                return;
            }

            res.status(200).json({
                id: result._id.toString(),
                name: result.name,
                description: result.description,
                image: result.image,
                ingredients: result.ingredients,
                steps: result.steps,
                approved: result.approved,
                user: {
                    id: result.user.id,
                    name: result.user.name,
                    image: result.user.image
                }
            });
            return;
        }

        if (req.method === 'PUT') {
            const { name, description, image, ingredients, steps, approved } = req.body;

            const fields = _.omitBy({ name, description, image, ingredients, steps, approved }, _.isUndefined);

            const result = await collection.updateOne({ _id }, { $set: fields });

            if (result.matchedCount === 0) {
                res.status(404).json({ message: 'Recipe not found' });
                return;
            }

            res.status(200).json({ message: 'Recipe updated' });
            return;
        }

        if (req.method === 'DELETE') {
            const result = await collection.deleteOne({ _id });

            if (result.deletedCount === 0) {
                res.status(404).json({ message: 'Recipe not found' });
                return;
            }

            res.status(200).json({ message: 'Recipe deleted successfully' });
            return;
        }

        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
