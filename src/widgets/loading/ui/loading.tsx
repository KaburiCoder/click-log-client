export const Loading = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center gap-2">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
        {children && <div className="text-white">{children}</div>}
      </div>
    </div>
  );
};
