import { DetailItem } from "@/features/slow-queries/ui/detail-item";
import { CopyButton } from "@/widgets/buttons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/widgets/ui/dialog";
import { ScrollArea } from "@/widgets/ui/scroll-area";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { format } from "sql-formatter";
import { SlowQuery } from "../models/slow-query";
import { StackFrames } from "./StackFrames";

interface SlowQueryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  slowQuery: SlowQuery | null;
}

export function SlowQueryDialog({
  isOpen,
  onOpenChange,
  slowQuery,
}: SlowQueryDialogProps) {
  const queryString = format(slowQuery?.queryString || "", {
    language: "mariadb",
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90%] w-fit max-w-[90rem] flex-col">
        <DialogHeader>
          <DialogTitle>Slow Query 상세목록</DialogTitle>
          <DialogDescription>
            느려지는 원인을 파악하고 수정해주세요.
            <br />
            여기에 보여지는 쿼리가 반드시 느린것은 아닙니다.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-stretch gap-4 overflow-hidden">
          <div className="flex max-w-[25rem] flex-col gap-2">
            <DetailItem label="병원코드" value={slowQuery?.ykiho} />
            <DetailItem label="컴퓨터명" value={slowQuery?.computerName} />
            <DetailItem label="어셈블리" value={slowQuery?.assemblyName} />
            <DetailItem label="클래스" value={slowQuery?.className} />
            <DetailItem label="메소드" value={slowQuery?.methodName} />
            <DetailItem
              label="실행시간"
              value={`${slowQuery?.executionSeconds}초`}
            />

            <StackFrames slowQueryId={slowQuery?.id || 0} isOpen={isOpen} />
          </div>
          <div className="relative flex max-h-[50rem] max-w-[40rem] flex-col overflow-hidden rounded">
            <div className="absolute right-0 top-0 z-10 flex justify-end">
              <CopyButton copyText={queryString} />
            </div>

            <ScrollArea>
              <SyntaxHighlighter
                language="sql"
                style={monokai}
                customStyle={{ overflow: "auto" }}
              >
                {queryString}
              </SyntaxHighlighter>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
