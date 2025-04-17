import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '../../types';
import { toast } from 'sonner';
import api from '../axios';
import { QUERY_KEYS } from '../../constant';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todo: Todo): Promise<Todo> => {
      const res = await api.put(`/todos/${todo.id}`, todo);
      return res.data;
    },

    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.TODOS] });

      const prevTodos = queryClient.getQueryData<Todo[]>([QUERY_KEYS.TODOS]);

      queryClient.setQueryData<Todo[]>(
        [QUERY_KEYS.TODOS],
        (prevTodos) =>
          prevTodos?.map((todo) =>
            todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo,
          ) || [],
      );

      return { prevTodos };
    },

    onError: (error, _todo, context) => {
      queryClient.setQueryData([QUERY_KEYS.TODOS], context?.prevTodos);
      toast.error(`❌ Failed to update todo: ${error.message}`);
    },

    onSuccess: () => {
      toast.success('✅ Todo updated!');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
    },
  });
};
