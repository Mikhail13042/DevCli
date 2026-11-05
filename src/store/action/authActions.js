import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { accounts } from '../../services/accounts.js';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ login, password }, { rejectWithValue }) => {
    const user = accounts.find(
      (acc) => acc.login === login.trim() && acc.password === password
    );
    if (!user) return rejectWithValue('Неверный логин или пароль');
    return { login: user.login, name: user.name };
  }
);

export const logoutUser = createAction('auth/logout');