import { renderToStream } from "@react-pdf/renderer";
import { createElement } from "react";
import ResumePDF from "@/app/components/ResumePDF";
import { workExperiences } from "@/app/data/experiences";
import { NextRequest, NextResponse } from "next/server";
import { Language } from "@/app/types/language";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lang = (searchParams.get("lang") || "hu") as Language;

    // Validate language parameter
    const language: Language = lang === "en" ? "en" : "hu";

    const stream = await renderToStream(
      createElement(ResumePDF, { experiences: workExperiences, language })
    );

    const filename = language === "hu" ? "tasnadi-marton-cv.pdf" : "marton-tasnadi-cv.pdf";

    return new NextResponse(stream as unknown as ReadableStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
