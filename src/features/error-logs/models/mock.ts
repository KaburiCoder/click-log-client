import { ErrorLog } from './types';

export const mockErrorLogs: ErrorLog[] = Array.from({ length: 35 }, (_, i) => {
  const hospitals = [
    "서울대학교병원",
    "연세대학교병원",
    "서울아산병원",
    "삼성서울병원",
    "고려대학교병원"
  ];

  const modules = [
    "환자관리",
    "진료기록",
    "처방전달",
    "영상관리",
    "검사결과"
  ];

  const logLevels = ["ERROR", "WARN", "FATAL"];
  const exceptionTypes = ["NullPointerException", "IllegalArgumentException", "RuntimeException", "IOException"];

  return {
    id: `err-${i + 1}`,
    created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    module_name: modules[Math.floor(Math.random() * modules.length)],
    log_level: logLevels[Math.floor(Math.random() * logLevels.length)],
    exception_type: exceptionTypes[Math.floor(Math.random() * exceptionTypes.length)],
    error_message: `An error occurred while processing request #${Math.floor(Math.random() * 1000)}`,
    hospital_name: hospitals[Math.floor(Math.random() * hospitals.length)],
    computer_name: `PC-${Math.floor(Math.random() * 100)}`
  };
});