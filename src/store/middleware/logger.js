export const logger = (store) => (next) => (action) => {
  const user = store.getState().auth.user;
  console.log(
    `[${new Date().toLocaleTimeString()}] ${user ? user.login : 'гость'}:`,
    action.type
  );
  return next(action);
};