import { Input } from './shadcn/Input';
import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
  onSearchChange: (value: string) => void;
}

export const SearchBar = ({ onSearchChange }: SearchBarProps) => {
  return (
    <div className="max-w-md mx-auto mb-2">
      <Input placeholder="search items..." onChange={(e) => onSearchChange(e.target.value)}>
        <SearchIcon className="text-muted-foreground mt-2 mr-2" size={20} />
      </Input>
    </div>
  );
};
