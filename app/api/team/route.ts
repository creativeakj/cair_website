import { NextResponse } from "next/server";
import { getActiveTeamMembers } from "@/lib/services/team";

export async function GET() {
  const data = await getActiveTeamMembers();
  return NextResponse.json({ success: true, data });
}
