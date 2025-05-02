import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';

@Injectable()
export class AuthService {
  async register(
    email: string,
    password: string,
    displayName: string,
    phone: string,
  ) {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        throw new Error(error.message);
      }

      const user = data?.user;
      if (!user) {
        throw new Error('User not returned');
      }

      const { error: profileError } = await supabase.from('profiles').insert({
        id: user.id,
        display_name: displayName,
        phone,
      });

      if (profileError) {
        throw new Error(profileError.message);
      }

      return { message: 'User registered successfully' };
    } catch (error: unknown) {
      // Pengecekan tipe error
      if (error instanceof Error) {
        return {
          status: 'error',
          message: error.message || 'Registration failed',
        };
      }

      // Jika error bukan instance dari Error, bisa return default message
      return {
        status: 'error',
        message: 'Unknown error occurred',
      };
    }
  }

  async login(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data?.user) {
        throw new Error('User not found');
      }

      return {
        access_token: data.session?.access_token,
        user: data.user,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          status: 'error',
          message: error.message || 'Login failed',
        };
      }

      return {
        status: 'error',
        message: 'Unknown error occurred',
      };
    }
  }
}
