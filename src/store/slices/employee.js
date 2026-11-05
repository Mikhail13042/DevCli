import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} from '../action/employeeAction.js';

const thunks = [fetchEmployees, addEmployee, deleteEmployee, updateEmployee];

const employeeSlice = createSlice({
  name: 'employee',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(...thunks.map((t) => t.pending)), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(...thunks.map((t) => t.fulfilled)), (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addMatcher(isAnyOf(...thunks.map((t) => t.rejected)), (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;