"use client";

import { LikeButton } from "@/components/like-button";
import { getIssueInteractions } from "@/http/get-issue-interactions";
import { useSuspenseQuery } from "@tanstack/react-query";

interface IssueLikeButtonProps {
  issueId: string;
}

export function IssueLikeButton({ issueId }: IssueLikeButtonProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["issue-likes", issueId],
    queryFn: () => getIssueInteractions({ issueIds: [issueId] }),
  });

  const intecation = data.interactions[0];

  return (
    <LikeButton
      issueId={issueId}
      initialLikes={intecation.likesCount}
      initialLiked={intecation.isLiked}
    />
  );
}
