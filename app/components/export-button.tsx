"use client";

import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";
import { exportExcelAction } from "../actions/export-excel";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import LoadingButton from "@/components/ui/loading-button";

function ExportButton() {
  const [exporting, setExporting] = useState<boolean>(false);

  const handleExport = async () => {
    setExporting(true);
    const res = await exportExcelAction();

    if (res.success && res.blob) {
      saveAs(res.blob as Blob, "voters.xlsx");
      toast({
        title: res.msg,
        description: "You can see them now in your downloads folder",
      });
    }

    if (!res.success) {
      toast({
        title: res.msg,
        description: "Try importing PCVL files first to populate the table.",
      });
    }

    setExporting(false);
  };

  return (
    <>
      {exporting ? (
        <LoadingButton variant={"default"} label="Exporting" />
      ) : (
        <Button onClick={handleExport}>Export</Button>
      )}
    </>
  );
}

export default ExportButton;
