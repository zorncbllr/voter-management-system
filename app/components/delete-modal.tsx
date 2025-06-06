"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useModalStore } from "../stores/modal-store";
import { Button } from "@/components/ui/button";
import { clearVotersAction } from "../actions/clear-voters";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import LoadingButton from "@/components/ui/loading-button";
import { LoaderIcon } from "lucide-react";

export default function DeleteModal() {
  const { openClear, setOpenClear } = useModalStore();
  const [clearing, setClearing] = useState<boolean>(false);

  const handleClick = async () => {
    setClearing(true);
    const res = await clearVotersAction();

    if (res.success) {
      toast({
        title: res.msg,
        description: "You can import new PCVL files now.",
      });
      setOpenClear(false);
    }

    setClearing(false);
  };

  return (
    <Dialog open={openClear} onClose={setOpenClear} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary sm:mx-0 sm:size-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="size-6 text-primary"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Clear All Data
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to clear them? All of your imported
                      data will be permanently removed. This action cannot be
                      undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 gap-2 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {clearing ? (
                <LoadingButton variant={"default"} label="Clearing" />
              ) : (
                <Button onClick={handleClick}>Clear</Button>
              )}

              <Button
                disabled={clearing}
                variant={"secondary"}
                onClick={() => setOpenClear(false)}
              >
                Cancel
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
