
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const searchParams = req.nextUrl.searchParams;
  const dimension = searchParams.get('dimension');

  if (!id || !dimension) {
    return NextResponse.json({ error: "Report ID and Dimension are required" }, { status: 400 });
  }

  try {
    const outputDir = process.env.REPORT_OUTPUT_DIR || 'reports';
    const statusFilePath = path.join(process.cwd(), outputDir, id, `${dimension}_status.json`);

    try {
      const content = await fs.readFile(statusFilePath, 'utf-8');
      const statusData = JSON.parse(content);
      return NextResponse.json(statusData);
    } catch (e) {
      // File not found implies processing hasn't started writing status yet or invalid ID
      // Return 404 or a "pending" status if we trust the ID exists
      return NextResponse.json({ status: "pending", message: "Status not available yet" }, { status: 404 });
    }

  } catch (error: any) {
    console.error("Status Check Error:", error);
    return NextResponse.json({ status: "error", error: "Internal Server Error" }, { status: 500 });
  }
}
