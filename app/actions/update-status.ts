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
