"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
