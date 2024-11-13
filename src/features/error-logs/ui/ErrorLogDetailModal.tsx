import { ErrorLog } from "../models/types";

interface ErrorLogDetailModalProps {
  log: ErrorLog;
  onClose: () => void;
}

export const ErrorLogDetailModal = ({
  log,
  onClose,
}: ErrorLogDetailModalProps) => {
  return (
    <div className="fixed inset-0 top-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">에러 상세 내역</h2>
        <div className="space-y-2">
          <p>
            <strong>발생시간:</strong>{" "}
            {log.createdAt.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
          </p>
          <p>
            <strong>병원명:</strong> {log.hospitalName}
          </p>
          <p>
            <strong>컴퓨터명:</strong> {log.computerName}
          </p>
          <p>
            <strong>모듈:</strong> {log.moduleName}
          </p>
          <p>
            <strong>로그 레벨:</strong> {log.logLevel}
          </p>
          <p>
            <strong>예외 타입:</strong> {log.exceptionType}
          </p>
          <p>
            <strong>에러 메시지:</strong> {log.errorMessage}
          </p>
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
