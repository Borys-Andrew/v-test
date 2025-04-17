import { NewTodo, Todo } from '../../types';
import api from '../axios';

export const todoApi = {
  getTodos: async ({
    limit = 10,
    page = 1,
  }: {
    limit: number;
    page: number;
  }): Promise<Todo[]> => {
    const response = await api.get('/todos', {
      params: { _limit: limit, _page: page },
    });
    return response.data;
  },

  createTodo: async ({ title, completed, userId }: NewTodo) => {
    const response = await api.post('/todos', { title, completed, userId });
    return response.data;
  },

  deleteTodo: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};
