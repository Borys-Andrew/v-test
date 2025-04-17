import { useQuery } from '@tanstack/react-query';
import { todoApi } from './todoApi';
import { QUERY_KEYS } from '../../constant';

export const useTodos = (limit = 10, page = 1) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TODOS, limit, page],
    queryFn: () => todoApi.getTodos({ limit, page }),
  });
};
