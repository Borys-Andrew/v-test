'use client';

import { PER_PAGE } from '../constants';
import { ChevronDown } from 'lucide-react';

type PerPageSelectorProps = {
  perPage: number;
  onSetSelectedPages: (data: number) => void;
};

export const PerPageSelector = ({
  perPage,
  onSetSelectedPages,
}: PerPageSelectorProps) => {
  return (
    <div className="relative">
      <select
        value={perPage}
        className="flex items-center justify-center p-3 border border-teal-500 rounded-2xl cursor-pointer appearance-none pr-10"
        onChange={(e) => onSetSelectedPages(+e.target.value)}
      >
        {Object.keys(PER_PAGE).map((page) => (
          <option
            key={page}
            defaultValue={perPage}
            className="bg-[#242424]"
          >
            {`${PER_PAGE[page as keyof typeof PER_PAGE]}`}
          </option>
        ))}
      </select>

      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
    </div>
  );
};
