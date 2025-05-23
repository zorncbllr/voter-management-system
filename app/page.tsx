import { DataTable } from "@/components/common/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
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
            <DataTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
