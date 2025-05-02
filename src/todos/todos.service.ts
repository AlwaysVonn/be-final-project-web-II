import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';

export interface Todo {
  id: string;
  title: string;
  is_done: boolean;
  user_id: string;
}

@Injectable()
export class TodosService {
  async getTodos(userId: string) {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      throw new Error(error.message || 'Failed to get todos');
    }

    return data as Todo[];
  }

  async addTodo(title: string, userId: string) {
    const { error } = await supabase.from('todos').insert([
      {
        title,
        is_done: false,
        user_id: userId,
      },
    ]);

    if (error) {
      throw new Error(error.message || 'Failed to add todo');
    }
  }

  async markDone(id: string) {
    const { error } = await supabase
      .from('todos')
      .update({ is_done: true })
      .eq('id', id);

    if (error) {
      throw new Error(error.message || 'Failed to mark todo as done');
    }
  }

  async delete(id: string) {
    const { error } = await supabase.from('todos').delete().eq('id', id);

    if (error) {
      throw new Error(error.message || 'Failed to delete todo');
    }
  }
}
