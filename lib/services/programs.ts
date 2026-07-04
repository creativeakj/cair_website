import { cacheLife, cacheTag } from "next/cache";
import { programsCollection } from "@/lib/db/collections";
import type { Program } from "@/types/program";

export type ProgramDTO = Omit<Program, "_id"> & { id: string };

export async function getPrograms(): Promise<ProgramDTO[]> {
  "use cache";
  cacheLife("days");
  cacheTag("programs");

  const collection = await programsCollection();
  const docs = await collection.find({}).sort({ display_order: 1 }).toArray();
  return docs.map(({ _id, ...rest }) => ({ id: _id!.toString(), ...rest }));
}
