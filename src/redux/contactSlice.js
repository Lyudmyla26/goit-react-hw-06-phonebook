import { createSlice, nanoid } from '@reduxjs/toolkit';
const initialContacts = [
  { id: 'id-1', name: 'Bill Gates', number: '444-89-13' },
  { id: 'id-2', name: 'Elon Musk', number: '644-11-22' },
  { id: 'id-3', name: 'Steve Jobs', number: '349-14-96' },
  { id: 'id-4', name: 'Mark Zuckerberg', number: '227-91-26' },
];
// const contactsState = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    addContact: {
      reducer(state, { payload }) {
        return [...state, payload];
      },
      prepare(name, number) {
        return {
          payload: {
            name,
            number,
            id: nanoid(),
          },
        };
      },
    },
    deleteContact(state, { payload }) {
      const index = state.findIndex(item => item.id === payload);
      state.splice(index, 1);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
