"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { ChangeEvent } from "react";

function ImportButton() {
  const importFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const pdf = files.item(0) as File;

      const reader = new FileReader();

      reader.onload = async (ev) => {
        const pdf: string = reader.result?.toString().split(",")[1] as string;

        const res = await axios.post("/api/voters", { pdf });

        console.log(res.data);
      };

      reader.readAsDataURL(pdf);
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
