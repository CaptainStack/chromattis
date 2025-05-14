export const update_title = state => {
  return { ...state, title: 'NEW' };
}

export const update_one = state => {
  return {
    ...state,
    child: {
      ...state.child,
      one: 'NEW_FIRST',
    },
  };
}
