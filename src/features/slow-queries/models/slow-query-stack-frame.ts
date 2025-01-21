export interface SlowQueryStackFrame {
    id: number;
    assemblyName: string;
    className: string;
    methodName: string;
    offset: number;
    lineNumber: number;
    columnNumber: number;
  }