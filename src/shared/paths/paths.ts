export const paths = {
  root: "/",
  login: "/login",
};

export const apiPaths = {
  click: {
    errorLogs: "/click/error-logs",
    stacktrace: (id: string) => `/click/error-log/${id}/stacktrace`,
  },
  cpm: {
    csNames: "/cpm/cs/names",
  },
  auth: {
    signin: "/auth/signin",
    check: "/auth/check",
  },
}
