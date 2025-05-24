"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateStatusAction = async ({
  voterId,
  value,
}: {
  voterId: number;
  value: boolean;
}) => {
  try {
    await prisma.voter.update({
      data: {
        isGiven: value,
      },
      where: {
        voterId,
      },
    });

    revalidatePath("/");

    return { success: true, status: 204 };
  } catch (error) {
    return { success: false, status: 500 };
  }
};
