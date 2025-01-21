import React from "react";
import { useFetchStackFrames } from "../hooks/use-fetch-stackframes";

interface StackFramesProps {
  slowQueryId: number;
  isOpen: boolean;
}

export const StackFrames: React.FC<StackFramesProps> = ({
  slowQueryId,
  isOpen,
}) => {
  const { frames } = useFetchStackFrames(slowQueryId, isOpen);

  if (!isOpen || !frames?.length) return null;

  return (
    <div className="w-full overflow-y-auto rounded border border-b border-red-300 p-2">
      <h3 className="mb-2 text-lg font-semibold">Stack Frames</h3>
      <ul className="space-y-2 text-sm">
        {frames.map((frame, index) => (
          <li key={index}>
            <div className="flex flex-col">
              <span className="font-semibold text-blue-600">
                {frame.assemblyName}.{frame.className}.{frame.methodName}
              </span>
              <span className="text-gray-600">
                offset: {frame.offset}, line: {frame.lineNumber}, column:{" "}
                {frame.columnNumber}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
