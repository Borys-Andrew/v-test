'use client';

import { cn } from '../../../libs';
import { Todo } from '../../../types';
import { TodoItem } from './todoItem';

type TodoListProps = {
  todos: Todo[];
  className?: string;
  onUpdateTodo: (data: Todo) => void;
  onDeleteTodo: (id: number) => void;
};

export const TodoList = ({
  todos,
  className,
  onUpdateTodo,
  onDeleteTodo,
}: TodoListProps) => {
  return (
    <ul className={cn('flex flex-col gap-2 w-full', className)}>
      {todos.map(({ id, title, completed }) => (
        <TodoItem
          key={id}
          id={id}
          title={title}
          isCompleted={completed}
          onUpdate={onUpdateTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </ul>
  );
};
