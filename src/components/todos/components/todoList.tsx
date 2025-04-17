'use client';

import { cn } from '../../../libs';
import { Todo } from '../../../types';
import { TodoItem } from './todoItem';

type TodoListProps = {
  todos: Todo[];
  className?: string;
  onDeleteTodo: (id: number) => void;
};

export const TodoList = ({ todos, className, onDeleteTodo }: TodoListProps) => {
  return (
    <ul
      className={cn(
        'flex flex-col gap-2 w-full',
        //   (isPlaceholderData || isLoading) && 'opacity-50',
        className,
      )}
    >
      {todos.map(({ id, title, completed }) => (
        <TodoItem
          key={id}
          id={id}
          title={title}
          isCompleted={completed}
          onDelete={onDeleteTodo}
        />
      ))}
    </ul>
  );
};
