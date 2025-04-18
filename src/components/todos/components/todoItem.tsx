'use client';

import { DeleteIcon } from 'lucide-react';
import { cn } from '../../../libs';
import { Todo } from '../../../types';

type TodoItemProps = {
  id: number;
  title: string;
  isCompleted: boolean;
  onUpdate: (data: Todo) => void;
  onDelete: (id: number) => void;
};

export const TodoItem = ({
  id,
  title,
  isCompleted,
  onUpdate,
  onDelete,
}: TodoItemProps) => {
  return (
    <li
      key={id}
      className="flex gap-2.5 justify-between border border-slate-400 p-4 rounded-xl w-full hover:border-teal-500"
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => {}}
          className="size-5 cursor-pointer hover:scale-120 transition-smooth"
          onClick={() =>
            onUpdate({
              id,
              title,
              completed: !isCompleted,
              userId: 1,
            })
          }
        />
        <span
          className={cn(
            'text-xl line-clamp-1',
            isCompleted && 'line-through opacity-50',
          )}
        >
          {title}
        </span>
      </div>
      <button
        className="cursor-pointer"
        onClick={() => onDelete(id)}
      >
        <DeleteIcon className="hover:text-red-500 hover:scale-120 transition-smooth" />
      </button>
    </li>
  );
};
