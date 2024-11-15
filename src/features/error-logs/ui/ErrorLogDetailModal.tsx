import { Loading } from "@/widgets/loading";
import { useStackTrace } from "../hooks/use-stack-trace";
import { ErrorLog } from "../models/types";
import { useEffect } from "react";
import { format } from "date-fns/format";

interface ErrorLogDetailModalProps {
  log: ErrorLog;
  csNameMap: Map<string, string> | undefined;
  onClose: () => void;
}

export const ErrorLogDetailModal = ({
  log,
  csNameMap,
  onClose,
}: ErrorLogDetailModalProps) => {
  const { stackTrace, isPending } = useStackTrace(log.id);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (isPending) {
    return <Loading />;
  }

  return (
    <div
      className="fixed inset-0 top-0 z-10 flex items-center justify-center bg-black bg-opacity-50 duration-200 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-fit max-w-[80%] overflow-hidden rounded-lg bg-white p-6 duration-300 animate-in slide-in-from-bottom-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl font-bold">에러 상세 내역</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-[4.5rem_1fr] gap-2">
            <strong>발생시간:</strong>
            <span>{format(log.createdAt, "yy-MM-dd HH:mm:ss")}</span>
          </div>
          <div className="grid grid-cols-[4.5rem_1fr] gap-2">
            <strong>병원명:</strong>
            <span>{csNameMap?.get(log.ykiho) || ""}</span>
          </div>
          <div className="grid grid-cols-[4.5rem_1fr] gap-2">
            <strong>컴퓨터명:</strong>
            <span>{log.computerName}</span>
          </div>
          <div className="grid grid-cols-[4.5rem_1fr] gap-2">
            <strong>모듈:</strong>
            <span>{log.moduleName}</span>
          </div>
          <div className="grid grid-cols-[4.5rem_1fr] gap-2">
            <strong>로그 레벨:</strong>
            <span>{log.logLevel}</span>
          </div>
          <div className="grid grid-cols-[4.5rem_1fr] gap-2">
            <strong>예외 타입:</strong>
            <span>{log.exceptionType}</span>
          </div>
          <div className="col-span-2 grid grid-cols-[4.5rem_1fr] gap-2">
            <strong>Error:</strong>
            <span>{log.errorMessage}</span>
          </div>
          <div className="col-span-2 grid max-h-[50vh] w-full grid-cols-[4.5rem_1fr] gap-2">
            <strong>Stack:</strong>
            <span className="overflow-y-auto whitespace-pre-wrap break-all">
              {stackTrace}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
