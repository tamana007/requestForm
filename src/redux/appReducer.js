// appReducer.js
const initialState = {
  // Define your initial state here
  // For example:
  director: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DIRECTOR':
      return { ...state, director: action.payload };
    default:
      return state;
  }
};

export default appReducer;
