import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { isJolpicaError } from "@/api/jolpica/client";

type QueryErrorStateProps = {
  error: Error;
  refetch: () => void;
};

export function QueryErrorState({ error, refetch }: QueryErrorStateProps) {
  const isRateLimited = isJolpicaError(error) && error.status === 429;

  const title = isRateLimited ? "Too many requests" : "Error";

  const description = isRateLimited
    ? "The F1 data service is busy. Wait a few seconds and try again."
    : error.message;

  return (
    <Alert
      variant="destructive"
      className="flex w-full items-center gap-4 border-destructive/40 px-4 py-3.5 shadow-lg shadow-black/40 md:px-5 max-sm:flex-col max-sm:items-stretch"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-destructive/15 max-sm:hidden">
        <TriangleAlert className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <AlertTitle className="font-heading text-xl leading-tight font-bold tracking-wide uppercase">
          {title}
        </AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </div>
      <Button
        onClick={() => refetch()}
        variant="secondary"
        size="sm"
        className="shrink-0"
      >
        Retry
      </Button>
    </Alert>
  );
}
