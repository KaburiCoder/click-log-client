interface PageTitleProps {
  children: React.ReactNode;
}

export const PageTitle = ({ children }: PageTitleProps) => (
  <h1 className="text-2xl font-bold mb-6">{children}</h1>
); 