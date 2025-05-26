"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const clearVotersAction = async () => {
  await prisma.voter.deleteMany();

  revalidatePath("/");

  return {
    msg: "Voters table has been emptied.",
    success: true,
    status: 204,
  };
};
