export interface ErrorLog {
  id: string;
  createdAt: Date;
  moduleName: string;
  logLevel: string;
  exceptionType: string;
  errorMessage: string;
  hospitalName: string;
  computerName: string;
  ykiho: string;
  source: string;
  additionalData: string;
  clientVersion: string;
  stackTrace: string;
}

export interface CsNamesDto {
  totalCount: number;
  data: CsName[];
}
export interface CsName {
  code: string;
  myung: string;
}
