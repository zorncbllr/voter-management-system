"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useModalStore } from "../stores/modal-store";

function ClearButton() {
  const { setOpen } = useModalStore();

  return (
    <Button variant={"outline"} onClick={() => setOpen(true)}>
      Clear <Trash />
    </Button>
  );
}

export default ClearButton;
