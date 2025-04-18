import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '../../types';
import { toast } from 'sonner';
import { QUERY_KEYS } from '../../constant';
import { todoApi } from './todoApi';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      limit,
      page,
      todo,
    }: {
      limit: number;
      page: number;
      todo: Todo;
    }) => todoApi.updateTodo({ limit, page, todo }),

    onMutate: async ({ limit, page, todo: updatedTodo }) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.TODOS, limit, page],
      });

      const prevTodos = queryClient.getQueryData<Todo[]>([QUERY_KEYS.TODOS]);

      queryClient.setQueryData<Todo[]>(
        [QUERY_KEYS.TODOS, limit, page],
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
      //   queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
      toast.success('✅ Todo updated!');
    },

    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
    // },
  });
};
