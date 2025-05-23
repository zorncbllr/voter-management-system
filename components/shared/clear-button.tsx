import { Trash } from "lucide-react";
import { Button } from "../ui/button";

function ClearButton() {
  return (
    <Button variant={"outline"}>
      Clear <Trash />
    </Button>
  );
}

export default ClearButton;
