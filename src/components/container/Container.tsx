import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return <div className="flex-1 bg-white py-12 md:py-16">{children}</div>;
};
