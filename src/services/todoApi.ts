import axios from 'axios';
import { AppConfig } from '../utils';
import { Todo } from '../types';

// Create axios instance with default config
const api = axios.create({
  baseURL: AppConfig.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CreateTodoInput {
  title: string;
  completed?: boolean;
  userId?: number;
}

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

  createTodo: async ({
    title,
    completed = false,
    userId = 1,
  }: Partial<Todo>) => {
    const response = await api.post('/todos', { title, completed, userId });
    return response.data;
  },

  deleteTodo: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};
