import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.js';
import employeeReducer from './slices/employee.js';
import { logger } from './middleware/logger.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
  },
  middleware: (getDefault) => getDefault().concat(logger),
});