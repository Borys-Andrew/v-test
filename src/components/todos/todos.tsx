'use client';

import { useState } from 'react';
import { PER_PAGE } from './constants';
import {
  TodoActionPanel,
  TodoForm,
  TodoList,
  TodoPagination,
} from './components';
import { useTodos } from '../../api';
import { toast } from 'sonner';

export const Todos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_PAGE[5]);

  const { data: todos, error, isLoading } = useTodos({ limit: perPage, page });

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const handleSelectPages = (value: number) => setPerPage(value);
  const handleChangePage = (action: string) => {
    setPage((p) => (action === '+' ? p + 1 : p - 1));
  };

  const handleCreateTodo = () => {};
  const handleDeleteTodo = (id: number) => {
    console.log('🚀 ~ handleDeleteTodo ~ id:', id);
  };

  if (error) {
    toast.error('Failed to load todos');
    return <p className="text-red-500">Error loading todos...</p>;
  }

  if (isLoading || !todos) {
    return <p className="text-gray-500">Loading todos...</p>;
  }

  if (isModalOpen) {
    return (
      <TodoForm
        onHandleCreateTodo={handleCreateTodo}
        onCancel={toggleModal}
        isLoading={false}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 p-3 h-screen w-full">
      <h1 className="text-5xl underline self-center">TodoList</h1>
      <TodoActionPanel
        perPage={perPage}
        className="max-w-[600px]"
        onSetSelectedPages={handleSelectPages}
        toggleModal={toggleModal}
      />
      <div className="flex-1 flex justify-center overflow-auto w-full">
        <TodoList
          todos={todos}
          className="max-w-[600px]"
          onDeleteTodo={handleDeleteTodo}
        />
      </div>
      <TodoPagination
        currentPage={page}
        lastPage={todos.length ? Math.ceil(todos.length / perPage) : 1} // Оновлено для lastPage
        onHandleChangePage={handleChangePage}
      />
    </div>
  );
};
