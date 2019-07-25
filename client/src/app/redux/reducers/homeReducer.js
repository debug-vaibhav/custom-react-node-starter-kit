export const homeReducer = (
  state = {
    show: false
  },
  action
) => {
  switch (action.type) {
    case "TOGGLE_SHOW":
      return {
        ...state,
        show: !state.show
      };
    default:
      return state;
  }
};
