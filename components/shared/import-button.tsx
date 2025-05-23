"use client";

import { useFormState } from "react-dom";
import { Button } from "../ui/button";
import { importPDF } from "@/app/actions";

function ImportButton() {
  // const [state, formAction] = useFormState(importPDF, null);

  return (
    <form
      // action={formAction}
      encType="multipart/form-data"
      className="relative grid place-items-center overflow-hidden h-fit"
    >
      <input
        className="absolute z-99 text-transparent bg-transparent py-2"
        type="file"
        accept="application/pdf"
        name="pdf"
        required
      />
      <Button variant={"outline"}>Import</Button>
    </form>
  );
}

export default ImportButton;
