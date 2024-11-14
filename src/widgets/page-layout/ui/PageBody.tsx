interface PageBodyProps {
  children: React.ReactNode;
}

export const PageBody = ({ children }: PageBodyProps) => (
  <div className="bg-white shadow-md rounded-lg p-2 overflow-x-auto">
    {children}
  </div>
); 