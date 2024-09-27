"use client";

import { Button } from "@/components/ui/button";

import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/types/enums";
import { useLinkCreate } from "@/hooks";
import { LinkForm, LinkFormProps } from "@/components";
import { useCallback } from "react";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/contexts";

export function AddLink() {
  const navigate = useNavigate();
  const { username } = useAuth();

  const { mutateAsync, isPending } = useLinkCreate();

  const onSubmit = useCallback<LinkFormProps["onSubmit"]>(
    async (values) => {
      await mutateAsync({ ...values, username });

      navigate({ to: ROUTES.HOME });
    },
    [mutateAsync, navigate, username]
  );

  return (
    <div className="container mx-auto max-w-md min-h-screen flex items-center">
      <Button
        disabled={isPending}
        onClick={() => navigate({ to: ROUTES.HOME })}
        variant="link"
        className="absolute text-blue-500 left-20 top-5"
      >
        <ChevronLeft /> Back
      </Button>
      <LinkForm isLoading={isPending} onSubmit={onSubmit} />
    </div>
  );
}
