import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";

type FormValues = ILinkCreateInput;

export type LinkFormProps = {
  isLoading: boolean;
  onSubmit(values: FormValues): Promise<void>;
};

export function LinkForm({ isLoading, onSubmit }: LinkFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">Add New Link</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...register("title", { required: "Title is required" })}
            aria-invalid={errors.title ? "true" : "false"}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            {...register("image", {
              required: "Image URL is required",
              pattern: {
                value: /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i, // Regex for URL validation
                message: "Invalid image URL", // Error message for invalid URL
              },
            })}
            aria-invalid={errors.image ? "true" : "false"}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            "Add Link"
          )}
        </Button>
      </form>
    </div>
  );
}
