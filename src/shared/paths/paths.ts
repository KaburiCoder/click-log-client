export const paths = {
  root: "/",
  login: "/login",
  errorLogs: "/error-logs",
  slowQueries: "/slow-queries",
};

export const apiPaths = {
  click: {
    errorLog: "/click/error-log",
    stacktrace: (id: string) => `/click/error-log/${id}/stacktrace`,
    slowQuery: "/click/slow-query",
  },
  cpm: {
    csNames: "/cpm/cs/names",
  },
  auth: {
    signin: "/auth/signin",
    check: "/auth/check",
  },
};
