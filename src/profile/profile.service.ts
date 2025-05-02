import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';

export interface Profile {
  id: string;
  display_name: string;
  phone: string;
}

@Injectable()
export class ProfileService {
  async getProfileById(id: string): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id);

    if (error) throw new Error(error.message);
    return data as Profile[];
  }

  async updateUser(id: string, data: Profile): Promise<void> {
    const { error } = await supabase.from('profiles').update(data).eq('id', id);

    if (error) throw new Error(error.message);
  }
}
