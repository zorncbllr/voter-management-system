"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import pdf from "pdf-parse";

export const updateStatus = async ({
  voterId,
  value,
}: {
  voterId: number;
  value: boolean;
}) => {
  await prisma.voter.update({
    data: {
      isGiven: value,
    },
    where: {
      voterId,
    },
  });

  revalidatePath("/");
};

export const importPDF = async (prevState: any, formData: FormData) => {
  try {
    const file = formData.get("pdf") as File;

    const dataBuffer = Buffer.from(await file.arrayBuffer());

    const { text, numpages } = await pdf(dataBuffer);

    return {
      message: "PDF processed successfully",
      text: text,
      pages: numpages,
    };
  } catch (error) {}
};
