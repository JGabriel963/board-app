"use client";

import { Button } from "@/components/button";
import { toggleLike } from "@/http/toggle-like";
import type { IssueInteractionsResponseSchema } from "@/api/routes/schemas/issue-interactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ThumbsUpIcon } from "lucide-react";
import { ComponentProps, MouseEvent } from "react";
import z from "zod";

interface LikeButtonProps extends ComponentProps<"button"> {
  issueId: string;
  initialLikes: number;
  initialLiked?: boolean;
}

type IssueInteractiosResponse = z.infer<typeof IssueInteractionsResponseSchema>;

export function LikeButton({
  issueId,
  initialLikes,
  initialLiked,
  ...props
}: LikeButtonProps) {
  const queryClient = useQueryClient();

  const { mutate: onToggleLike, isPending } = useMutation({
    mutationFn: () => toggleLike({ issueId }),
    onMutate: async () => {
      const previousData = queryClient.getQueriesData<IssueInteractiosResponse>(
        {
          queryKey: ["issue-likes"],
        },
      );

      queryClient.setQueriesData<IssueInteractiosResponse>(
        { queryKey: ["issue-likes"] },
        (old) => {
          if (!old) {
            return undefined;
          }

          return {
            ...old,
            interactions: old.interactions.map((interaction) => {
              if (interaction.issueId === issueId) {
                return {
                  ...interaction,
                  isLiked: !interaction.isLiked,
                  likesCount: interaction.isLiked
                    ? interaction.likesCount - 1
                    : interaction.likesCount + 1,
                };
              }

              return interaction;
            }),
          };
        },
      );

      return { previousData };
    },
    onError: async (_err, _params, context) => {
      if (context?.previousData) {
        for (const [queryKey, data] of context.previousData) {
          queryClient.setQueryData<IssueInteractiosResponse>(queryKey, data);
        }
      }
    },
  });

  const liked = initialLiked;

  function handleToggleLike(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    onToggleLike();
  }

  return (
    <Button
      data-liked={liked}
      onClick={handleToggleLike}
      disabled={isPending}
      {...props}
      className="data-[liked=true]:bg-indigo-600 data-[liked=true]:text-white data-[liked=true]:hover:bg-indigo-500"
      aria-label={liked ? "Unlike" : "Like"}
    >
      <ThumbsUpIcon className="size-3" />
      <span className="text-sm">{initialLikes}</span>
    </Button>
  );
}
