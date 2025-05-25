"use client";

import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";
import { exportExcelAction } from "../actions/export-excel";

function ExportButton() {
  const handleExport = async () => {
    const res = await exportExcelAction();

    if (res.success && res.blob) {
      saveAs(res.blob as Blob, "voters.xlsx");
      console.log(res.blob);
    }

    if (res.success == false) {
      console.log(res);
    }
  };

  return <Button onClick={handleExport}>Export</Button>;
}

export default ExportButton;
