import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NewTodo, Todo } from '../../types';
import { todoApi } from './todoApi';
import { QUERY_KEYS } from '../../constant';

import { toast } from 'sonner';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoApi.createTodo,

    onMutate: async ({ title, completed = false, userId = 1 }: NewTodo) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.TODOS] });

      const prevTodos = queryClient.getQueryData<Todo[]>([QUERY_KEYS.TODOS]);

      const optimisticTodo = {
        id: Math.random(),
        title,
        completed,
        userId,
      };

      queryClient.setQueryData<Todo[]>([QUERY_KEYS.TODOS], (prev) => [
        optimisticTodo,
        ...(prev || []),
      ]);

      return { prevTodos };
    },

    onError: (error, _newTodo, context) => {
      queryClient.setQueryData([QUERY_KEYS.TODOS], context?.prevTodos);
      toast.error(`❌ Failed to create todo: ${error.message}`);
    },

    onSuccess: () => {
      toast.success('✅ Todo created!');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
    },
  });
};
