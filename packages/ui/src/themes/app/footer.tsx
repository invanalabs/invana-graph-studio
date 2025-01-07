import React from 'react';

interface AppFooterProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}


export const AppFooter: React.FC<AppFooterProps> = (props) => {
  return (
    <footer className="flex h-[30px] items-center justify-between border-t border-border bg-background px-4">
      <div className="flex flex-1 items-center gap-4">
        <div className="flex items-center gap-2 text-foreground text-xl">
          {/* header left */}
          {props?.left}
        </div>
        <div className="flex-1 flex justify-center items-center gap-1 sm:gap-2">
          {/* header middle */}
          {props?.center}
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          {/* header right */}
          {props?.right}
        </div>
      </div>
    </footer>
  );
};

