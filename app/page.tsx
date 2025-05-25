import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Voter } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { DataTable } from "./components/data-table";
import DeleteModal from "./components/delete-modal";
import VoterFormModal from "./components/voter-form-modal";

export default async function Home() {
  const voters: Voter[] = await prisma.voter.findMany({
    orderBy: {
      precinct: "asc",
    },
  });

  return (
    <div className="flex justify-center pt-12 bg-secondary w-full h-screen">
      <div className="w-4/5">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Manage Voters</CardTitle>
            <CardDescription>
              View, search, and manage registered voters. You can import pcvl
              pdf file or export data as excel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable data={voters} />
          </CardContent>
        </Card>
      </div>

      <DeleteModal />
      <VoterFormModal />
    </div>
  );
}
