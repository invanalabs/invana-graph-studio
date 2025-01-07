import React from 'react';

interface AppFooterProps {
  children: React.ReactNode;
}


export const AppFooter: React.FC<AppFooterProps> = ({ children }) => {
  return (
    <footer className="flex h-[30px] items-center justify-between border-t border-border bg-background px-4">
      {children}
    </footer>
  );
};

