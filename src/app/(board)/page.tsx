import { ArchiveIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react";
import { Section } from "@/components/sections";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board",
};

interface BoardProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function Board({ searchParams }: BoardProps) {
  const { q } = await searchParams;

  return (
    <main className="grid grid-cols-4 gap-5 flex-1 items-stretch">
      <Section.Root>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size-3" />
            Backlog
          </Section.Title>

          <Section.IssueCount>16</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          <Card.Root>
            <Card.Header>
              <Card.Number>ECO</Card.Number>
              <Card.Title>Implementar cartão de crédito</Card.Title>
            </Card.Header>
            <Card.Footer>
              <Button>
                <ThumbsUpIcon className="size-3" />
                <span className="text-sm">12</span>
              </Button>
              <Button>
                <MessageCircleIcon className="size-3" />
                <span className="text-sm">12</span>
              </Button>
            </Card.Footer>
          </Card.Root>
        </Section.Content>
      </Section.Root>
    </main>
  );
}
