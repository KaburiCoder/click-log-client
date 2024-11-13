import React from "react";
import { PageTitle } from "./PageTitle";
import { PageBody } from "./PageBody";

interface PageLayoutProps extends React.PropsWithChildren {
  title: React.ReactNode;
}

export const PageLayout = ({ children, title }: PageLayoutProps) => {
  return (
    <div className="p-8">
      <PageTitle>{title}</PageTitle>
      <PageBody>{children}</PageBody>
    </div>
  );
};
