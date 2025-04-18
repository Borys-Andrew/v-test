import { useCallback, useState } from 'react';
import {
  useCreateTodo,
  useDeleteTodo,
  useGetTodos,
  useUpdateTodo,
} from '../../api';
import { Todo } from '../../types';
import { PER_PAGE } from './constants';

export const useTodos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_PAGE[5]);

  const {
    data: todos,
    error,
    isLoading,
  } = useGetTodos({ limit: perPage, page });
  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const handleSelectPages = (value: number) => setPerPage(value);
  const handleChangePage = (action: string) => {
    setPage((p) => (action === '+' ? p + 1 : Math.max(1, p - 1)));
  };

  const handleCreateTodo = (title: string) => {
    createTodo.mutate({ title, completed: false, userId: 1 });
    toggleModal();
  };

  const handleUpdateTodo = useCallback(
    (todo: Todo) => {
      updateTodo.mutate({ todo, page, limit: perPage });
    },
    [page, perPage, updateTodo],
  );

  const handleDeleteTodo = (id: number) => {
    deleteTodo.mutate(id);
  };

  return {
    todos,
    error,
    isLoading,
    isPending: createTodo.isPending,
    isModalOpen,
    page,
    perPage,
    toggleModal,
    handleSelectPages,
    handleChangePage,
    handleCreateTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  };
};
