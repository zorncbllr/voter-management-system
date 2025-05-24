import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { clearVotersAction } from "../actions/clear-voters";

function ClearButton() {
  return (
    <Button variant={"outline"} onClick={clearVotersAction}>
      Clear <Trash />
    </Button>
  );
}

export default ClearButton;
