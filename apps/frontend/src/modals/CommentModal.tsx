"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

type CommentModalProps = {
  onClose: () => void;
  onSubmit: (values: FormData) => Promise<unknown>;
};

type FormData = {
  text: string;
};

export function CommentModal({ onClose, onSubmit }: CommentModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSave: typeof onSubmit = async (values) => {
    await onSubmit(values);
    onClose();
  };

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          reset();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Comment</DialogTitle>
          <DialogDescription>
            Type your comment below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSave)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="text">Your comment</Label>
              <Textarea
                id="text"
                {...register("text", {
                  required: "Reply text is required",
                  minLength: {
                    value: 10,
                    message: "Reply must be at least 10 characters long",
                  },
                })}
                placeholder="Type your comment here."
              />
              {errors.text && (
                <p className="text-sm text-red-500">{errors.text.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit">{isSubmitting ? <Loader2 /> : "Save"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
