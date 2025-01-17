import { ChildrenProps } from "@/shared/types/props";
import { createContext, useContext, useState } from "react";

type States = {
  pageSize: number;
  setPageSize: (size: number) => void;
  pageIndex: number;
  setPageIndex: (index: number) => void;
};

const defaultStates: States = {
  pageSize: 20,
  setPageSize: () => {},
  pageIndex: 0,
  setPageIndex: () => {},
};

export const TablePaginationContext = createContext<States>(defaultStates);

export const TablePaginationProvider = ({ children }: ChildrenProps) => {
  const [pageSize, setPageSize] = useState(defaultStates.pageSize);
  const [pageIndex, setPageIndex] = useState(defaultStates.pageIndex);

  return (
    <TablePaginationContext.Provider
      value={{ pageSize, setPageSize, pageIndex, setPageIndex }}
    >
      {children}
    </TablePaginationContext.Provider>
  );
};

export const useTablePagination = () => {
  const context = useContext(TablePaginationContext);

  return context;
};
