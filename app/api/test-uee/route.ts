import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { Dimension } from "@/interfaces/types";
import { generateDimensionReport } from "@/services/reporter";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const companyName = searchParams.get('company') || "Apple Inc.";
        const language = (searchParams.get('lang') as any) || "zh-TW";

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "API Key is missing." }, { status: 500 });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const model = process.env.MODEL || "gemini-2.0-flash-exp";

        // Run specifically UEE
        const text = await generateDimensionReport(ai, model, companyName, Dimension.UEE, language);

        return new NextResponse(text, {
            status: 200,
            headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
