"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useModalStore } from "../stores/modal-store";

function ClearButton() {
  const { setOpenClear } = useModalStore();

  return (
    <Button variant={"outline"} onClick={() => setOpenClear(true)}>
      Clear <Trash />
    </Button>
  );
}

export default ClearButton;
