import { MongoClient } from "mongodb";

const dbName = process.env.MONGODB_DB ?? "cair";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }
  const client = new MongoClient(uri);
  return client.connect();
}

function getClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    // Preserve the client across HMR reloads in development.
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = createClientPromise();
    }
    return global._mongoClientPromise;
  }
  return createClientPromise();
}

let clientPromise: Promise<MongoClient> | undefined;

export default function getClient(): Promise<MongoClient> {
  if (!clientPromise) {
    clientPromise = getClientPromise();
  }
  return clientPromise;
}

export async function getDb() {
  const client = await getClient();
  return client.db(dbName);
}
