"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { PdfReader } from "pdfreader";

interface Voter {
  name: string;
  precinct: string;
  isGiven: boolean;
}

export const importPDFAction = async (base64Data: string) => {
  try {
    const buffer = Buffer.from(base64Data, "base64");

    let currentPrecint: string | null = null;
    const voters: Voter[] = [];

    await new Promise<void>((resolve, reject) => {
      const reader = new PdfReader();

      reader.parseBuffer(buffer, async (err, data) => {
        if (err) {
          reject(new Error("failed to parse pdf buffer"));
        }

        if (data?.text) {
          const match = data.text.match(/Prec : \w+/);

          if (match) {
            currentPrecint = match[0].replace("Prec : ", "");
          }

          const regex: RegExp =
            /(?:[*A-D]{1,3}[\t ]+)?([\p{Lu}.?'`_-]+(?:[\t ]+[\p{Lu}.?'`_-]+)*(?:,[\t ]*(?:[JS]R\.?|J[\t ]*R\.?|II\.?|III\.?|IV\.?|VI{0,3}|IX|X|V|[0-9]{1,4}))?,[\t ]*[\p{Lu}\t ."'?`._-]+(?:,?[\t ]*(?:[JS]R\.?|J[\t ]*R\.?|II\.?|III\.?|IV\.?|VI{0,3}|IX|X|V|[0-9]{1,4})[\t ]*)?[\p{Lu}\t ."'?`._-]*(?:[\t ]*"[\p{Lu}\s.'"?_`-]*")?)/u;

          const result = data.text.match(regex);

          const filters = [
            "AMBOLONG",
            "AMOROY",
            "AMOTAG",
            "BAGAUMA",
            "BALAWING",
            "BALETE",
            "BANGON",
            "CABANGCALAN",
            "CABAS-AN",
            "CALANAY",
            "CAPSAY",
            "DAYHAGAN",
            "DON PABLO DELA ROSA",
            "GUMAHANG",
            "JABOYOAN",
            "LANANG",
            "LUY-A",
            "MACABUG",
            "MALUBI",
            "MANAGANAGA",
            "MANAMOC",
            "MARIPOSA",
            "MATABA",
            "MATALANGTALANG",
            "MATONGOG",
            "NABONGSORAN",
            "PANGLE",
            "PANIQUE",
            "PINANAAN",
            "POBLACION",
            "PURO",
            "SAN AGUSTIN",
            "SAN ISIDRO",
            "SAWANG",
            "SYNDICATE",
            "TALABAAN",
            "TALIB",
            "TIGBAO",
            "TINAGO",
            "TINIGBAN",
            "AROROY",
            "MASBATE",
            "NATIONAL",
            "LOCAL",
          ];

          if (result) {
            let hasAddress = false;
            for (const filter of filters) {
              if (result[0].includes(filter)) {
                hasAddress = true;
                break;
              }
            }

            if (!hasAddress) {
              voters.push({
                name: result[0],
                precinct: currentPrecint ?? "No Precinct",
                isGiven: false,
              });
            }
          }

          resolve();
        }
      });
    });

    await prisma.voter.createMany({
      data: voters,
    });

    revalidatePath("/");

    return {
      msg: "successfully imported pcvl file.",
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "failed to import pcvl pdf file.",
      success: false,
      status: 500,
    };
  }
};
