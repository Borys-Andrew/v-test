'use client';

import {
  TodoActionPanel,
  TodoForm,
  TodoList,
  TodoPagination,
} from './components';
import { toast } from 'sonner';
import ClipLoader from 'react-spinners/ClipLoader';
import { useTodos } from './useTodos';

export const Todos = () => {
  const {
    todos,
    error,
    isLoading,
    isPending,
    isModalOpen,
    page,
    perPage,
    toggleModal,
    handleSelectPages,
    handleChangePage,
    handleCreateTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  } = useTodos();

  if (error) {
    toast.error('Failed to load todos');
    return <p className="text-red-500">Error loading todos...</p>;
  }

  if (isLoading || !todos) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <ClipLoader
          size={25}
          color="red"
        />
      </div>
    );
  }

  if (isModalOpen) {
    return (
      <TodoForm
        onCreateTodo={handleCreateTodo}
        onCancel={toggleModal}
        isLoading={isPending}
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
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </div>
      <TodoPagination
        currentPage={page}
        lastPage={todos.length ? Math.ceil(todos.length / perPage) : 1}
        onHandleChangePage={handleChangePage}
      />
    </div>
  );
};
