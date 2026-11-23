import { MongoClient } from 'mongodb';

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const connect = () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error('MONGODB_URI is not set');
    }

    return new MongoClient(uri).connect();
};

const getClient = () => {
    if (!global._mongoClientPromise) {
        global._mongoClientPromise = connect();
    }

    return global._mongoClientPromise;
};

export const getDb = async (name: 'recipes' | 'users') => {
    const client = await getClient();
    return client.db(name);
};
