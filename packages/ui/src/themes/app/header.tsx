import React from 'react';


export interface AppHeaderProps {
  children: React.ReactNode;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ children }) => {
  return (
    <header className="flex h-[50px] items-center border-b border-border bg-background px-4">
      {children}
    </header>
  );
};
