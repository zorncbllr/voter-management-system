import { NextRequest, NextResponse } from "next/server";
import { PdfReader } from "pdfreader";

interface BodyData {
  pdf: string;
}

export async function POST(req: NextRequest) {
  try {
    const { pdf: base64Data } = (await req.json()) as BodyData;

    const buffer = Buffer.from(base64Data, "base64");

    await new Promise((resolve, reject) => {
      const reader = new PdfReader();

      reader.parseBuffer(buffer, (err, data) => {
        if (err) {
          reject(new Error("failed to parse pdf buffer"));
        }

        resolve(console.log(data?.text));
      });
    });

    return NextResponse.json({ msg: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
