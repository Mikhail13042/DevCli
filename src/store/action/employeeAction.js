import { createAsyncThunk } from '@reduxjs/toolkit';
import InventoryAPI from '../../services/inventoryService.js';

export const fetchEmployees = createAsyncThunk('employee/fetch', async () => {
  return [...InventoryAPI.all()];
});

export const addEmployee = createAsyncThunk('employee/add', async (data) => {
  InventoryAPI.add(data);
  return [...InventoryAPI.all()];
});

export const deleteEmployee = createAsyncThunk('employee/delete', async (id) => {
  InventoryAPI.delete(id);
  return [...InventoryAPI.all()];
});

export const updateEmployee = createAsyncThunk('employee/update', async ({ id, data }) => {
  InventoryAPI.update({ id, ...data });
  return [...InventoryAPI.all()];
});