const { combineReducers } = require('@reduxjs/toolkit');
const { contactsReducer } = require('./contactSlice');
const { filterReducer } = require('./filterSlise');

export const reducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});
