import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return <div className="flex-1 bg-white py-4 md:py-8">{children}</div>;
};
