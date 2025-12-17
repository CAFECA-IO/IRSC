import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Job ID required" }, { status: 400 });
  }

  const outputDir = process.env.REPORT_OUTPUT_DIR || 'reports';
  const jobPath = path.join(process.cwd(), outputDir, id, 'job.json');

  try {
    const content = await fs.readFile(jobPath, 'utf-8');
    const jobData = JSON.parse(content);
    return NextResponse.json(jobData);
  } catch (e) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
}
