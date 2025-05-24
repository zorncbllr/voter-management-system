import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

function ClearButton() {
  return (
    <Button variant={"outline"}>
      Clear <Trash />
    </Button>
  );
}

export default ClearButton;
