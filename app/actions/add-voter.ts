"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const addVoterAction = async ({
  name,
  precinct,
}: {
  name: string;
  precinct: string;
}) => {
  try {
    await prisma.voter.create({
      data: {
        name,
        precinct,
        isGiven: false,
      },
    });

    revalidatePath("/");

    return {
      msg: "Voter has been added Successfully.",
      success: true,
      status: 204,
    };
  } catch (error) {
    return {
      msg: `Voter ${name} ${precinct} already exists.`,
      success: false,
      status: 400,
    };
  }
};
