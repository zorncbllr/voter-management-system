"use client";

import { Button } from "@/components/ui/button";
import { ChangeEvent } from "react";
import { importPDFAction } from "../actions/import-pdf";
import { toast } from "@/hooks/use-toast";

function ImportButton() {
  const importFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      importPDFAction(files.item(0) as File).then((res) => {
        if (res.success) {
          toast({
            title: res.msg,
            description: "You can manage them now in voters table.",
          });
        } else {
          toast({
            title: "Unable to import PCVL file.",
            description: res.msg,
          });
        }
      });
    }
  };

  return (
    <div className="relative grid place-items-center overflow-hidden h-fit">
      <input
        className="absolute z-99 text-transparent bg-transparent py-2"
        type="file"
        accept="application/pdf"
        name="pdf"
        required
        onChange={importFile}
      />
      <Button variant={"outline"}>Import</Button>
    </div>
  );
}

export default ImportButton;
