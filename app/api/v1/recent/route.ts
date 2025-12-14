
import { NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const outputDir = process.env.REPORT_OUTPUT_DIR || 'reports';
    const indexPath = path.join(process.cwd(), outputDir, 'index.json');

    try {
      const fileContent = await fs.readFile(indexPath, 'utf-8');
      const data = JSON.parse(fileContent);
      // Return top 10
      return NextResponse.json(data.slice(0, 10));
    } catch (error) {
      // If file doesn't exist or error, return empty array
      return NextResponse.json([]);
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch recent history" }, { status: 500 });
  }
}
