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
    <div className="w-full overflow-y-auto break-words rounded border border-red-300 p-4">
      <h3 className="mb-4 text-lg font-semibold">Stack Frames</h3>
      <ul className="space-y-4">
        {frames.map((frame, index) => (
          <li
            key={index}
            className="border-b border-gray-200 pb-3 last:border-b-0"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-blue-600">
                {frame.assemblyName}
              </span>
              <span className="text-sm text-gray-600">
                {frame.className}.{frame.methodName}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
