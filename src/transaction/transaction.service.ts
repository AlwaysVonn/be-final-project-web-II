import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'pendapatan' | 'pengeluaran';
  category: string | null;
  user_id: string;
  created_at: string;
}

@Injectable()
export class TransactionService {
  async getTransactions(userId: string): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transaction')
      .select('*')
      .eq('user_id', userId);

    if (error) throw new Error(error.message);
    return data?.map((item) => ({
      ...item,
      created_at: item.created_at || new Date().toISOString(),
    })) as Transaction[];
  }

  async addTransaction(
    userId: string,
    data: Omit<Transaction, 'id' | 'user_id' | 'created_at'>,
  ): Promise<void> {
    const { error } = await supabase.from('transaction').insert({
      ...data,
      user_id: userId,
      created_at: new Date().toISOString(),
    });

    if (error) throw new Error(error.message);
  }

  async updateTransaction(
    id: string,
    data: Partial<Transaction>,
  ): Promise<void> {
    const { error } = await supabase
      .from('transaction')
      .update(data)
      .eq('id', id);
    if (error) throw new Error(error.message);
  }

  async deleteTransaction(id: string): Promise<void> {
    const { error } = await supabase.from('transaction').delete().eq('id', id);
    if (error) throw new Error(error.message);
  }
}
