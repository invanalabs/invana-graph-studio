import { cn } from '../../lib/utils';
import React from 'react';
import { Input } from '../ui/input';


interface SearchInputProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, ...props }) => {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={"Search..."}
      className={cn("w-full px-2 py-1 border rounded-sm dark:bg-neutral-800 ", props?.className)}
    />
  );
};
