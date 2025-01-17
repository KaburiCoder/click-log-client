export interface SlowQuery {
  id: number;
  ykiho: string;
  computerName: string;
  assemblyName: string;
  className: string;
  methodName: string;
  queryString: string;
  executionSeconds: number;
  createdAt: Date;
}
