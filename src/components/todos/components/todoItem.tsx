'use client';

type TodoItemProps = {
  id: number;
  title: string;
  isCompleted: boolean;
  onDelete: (id: number) => void;
};

export const TodoItem = ({
  id,
  title,
  isCompleted,
  onDelete,
}: TodoItemProps) => {
  return (
    <li
      key={id}
      className="flex gap-2.5 justify-between border border-slate-400 p-4 rounded-xl w-full"
    >
      <span>{title}</span>
      <input
        type="checkbox"
        checked={isCompleted}
      />
      <button onClick={() => onDelete(id)}>D</button>
    </li>
  );
};
