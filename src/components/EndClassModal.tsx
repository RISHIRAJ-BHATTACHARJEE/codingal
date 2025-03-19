import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "./ui/textarea";

const INTERRUPTED_REASONS = [
  "Student didn't show up for the class.",
  "Student didn't show any interest.",
  "Student got disconnected.",
  "I got disconnected.",
  "Other reason",
] as const;

type InterruptedReason = (typeof INTERRUPTED_REASONS)[number];
type ReasonType = "completed" | InterruptedReason;

const EndClassModal = ({ onEnd }: { onEnd: () => void }) => {
  const [selectedReason, setSelectedReason] = useState<ReasonType | "">("");
  const [isInterrupted, setIsInterrupted] = useState(false);
  const [otherReason, setOtherReason] = useState("");
  const [open, setOpen] = useState(false);

  const handleConfirm = useCallback(() => {
    if (!selectedReason || (selectedReason === "Other reason" && !otherReason))
      return;
    onEnd();
    setOpen(false);
  }, [selectedReason, otherReason, onEnd]);

  const handleCompletedChange = useCallback((checked: boolean) => {
    if (checked) {
      setSelectedReason("completed");
      setIsInterrupted(false);
    } else {
      setSelectedReason("");
    }
  }, []);

  const handleInterruptedToggle = useCallback((checked: boolean) => {
    setIsInterrupted(checked);
    if (checked) {
      setSelectedReason("");
    } else {
      setSelectedReason("");
    }
  }, []);

  const handleReasonChange = useCallback((reason: InterruptedReason) => {
    setSelectedReason(reason);
    setIsInterrupted(true);
  }, []);

  const isConfirmDisabled =
    !selectedReason || (selectedReason === "Other reason" && !otherReason);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FF5A44] px-5 py-2 rounded-sm text-white cursor-pointer">
          End Class
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white p-6 space-y-4">
        <DialogHeader className="px-6 py-4">
          <DialogTitle className="text-xl">
            Select a reason to end class
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 -my-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={selectedReason === "completed"}
              onCheckedChange={handleCompletedChange}
              className="w-5 h-5 rounded-full text-white border-2 border-zinc-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
            />
            Class completed
          </label>

          <label className="flex items-center gap-2 cursor-pointer mt-4">
            <Checkbox
              checked={isInterrupted}
              onCheckedChange={handleInterruptedToggle}
              className="w-5 h-5 rounded-full text-white border-2 border-zinc-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
            />
            Class interrupted/aborted
          </label>
        </div>

        <AnimatePresence>
          {isInterrupted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="pl-6 space-y-2 overflow-hidden"
            >
              {INTERRUPTED_REASONS.map((reason) => (
                <label
                  key={reason}
                  className="flex items-center gap-2 cursor-pointer px-5"
                >
                  <Checkbox
                    checked={selectedReason === reason}
                    onCheckedChange={(checked) =>
                      checked && handleReasonChange(reason)
                    }
                    className="w-4.5 h-4.5 rounded-full text-white border border-zinc-500 data-[state=checked]:bg-[#FF5A44] data-[state=checked]:border-[#FF5A44]"
                  />
                  <span className="text-gray-600">{reason}</span>
                </label>
              ))}

              {selectedReason === "Other reason" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="mt-2 w-full px-5"
                >
                  <Textarea
                    placeholder="Type your reason..."
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    className="border border-gray-300 rounded-md"
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex px-6 gap-3 pt-10">
          <Button
            className="bg-[#FF5A44] text-white px-7 py-1.5 rounded-sm disabled:opacity-50 cursor-pointer"
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
          >
            End Class
          </Button>
          <Button
            className="text-gray-500 cursor-pointer text-md"
            variant="ghost"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EndClassModal;
