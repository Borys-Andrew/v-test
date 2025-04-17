import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from './todoApi';
import { toast } from 'sonner';
import { QUERY_KEYS } from '../../constant';
import { Todo } from '../../types';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => todoApi.deleteTodo(id),

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.TODOS] });

      const prevTodos = queryClient.getQueryData<Todo[]>([QUERY_KEYS.TODOS]);

      queryClient.setQueryData<Todo[]>(
        [QUERY_KEYS.TODOS],
        (oldTodos) => oldTodos?.filter((todo) => todo.id !== id) || [],
      );

      return { prevTodos };
    },

    onError: (error, _id, context) => {
      queryClient.setQueryData([QUERY_KEYS.TODOS], context?.prevTodos);
      toast.error(`❌ Failed to delete todo: ${error.message}`);
    },

    onSuccess: () => {
      toast.success('✅ Todo deleted!');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
    },
  });
};
