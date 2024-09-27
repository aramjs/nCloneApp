import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { LinkForm, LinkFormProps } from "@/components";

type CreateLinkModalProps = {
  onClose: () => void;
  onSubmit: LinkFormProps["onSubmit"];
};

export function CreateLinkModal({ onClose, onSubmit }: CreateLinkModalProps) {
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
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="invisible" />

        <LinkForm onSubmit={onSave} />
      </DialogContent>
    </Dialog>
  );
}
