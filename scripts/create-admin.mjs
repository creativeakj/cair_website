import "dotenv/config";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Missing MONGODB_URI in .env');
  process.exit(1);
}
const dbName = process.env.MONGODB_DB ?? "cair";

const [, , emailArg, passwordArg, nameArg] = process.argv;
const email = emailArg ?? process.env.ADMIN_EMAIL;
const password = passwordArg ?? process.env.ADMIN_PASSWORD;
const name = nameArg ?? process.env.ADMIN_NAME ?? "Admin";

if (!email || !password) {
  console.error("Usage: npm run create-admin -- <email> <password> [name]");
  console.error("   or: ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run create-admin");
  process.exit(1);
}
if (password.length < 8) {
  console.error("Password must be at least 8 characters.");
  process.exit(1);
}

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const password_hash = await bcrypt.hash(password, 12);

  await db.collection("admin_users").updateOne(
    { email: email.toLowerCase().trim() },
    { $set: { email: email.toLowerCase().trim(), password_hash, name }, $setOnInsert: { created_at: new Date() } },
    { upsert: true },
  );

  console.log(`Admin user ready: ${email}`);
  await client.close();
}

main().catch((err) => {
  console.error("Failed to create admin:", err);
  process.exit(1);
});
