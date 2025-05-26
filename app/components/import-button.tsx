"use client";

import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { importPDFAction } from "../actions/import-pdf";
import { toast } from "@/hooks/use-toast";
import LoadingButton from "@/components/ui/loading-button";

function ImportButton() {
  const [importing, setImporting] = useState<boolean>(false);

  const importFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setImporting(true);

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

        setImporting(false);
      });
    }
  };

  return (
    <>
      {importing ? (
        <LoadingButton variant={"outline"} />
      ) : (
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
      )}
    </>
  );
}

export default ImportButton;
