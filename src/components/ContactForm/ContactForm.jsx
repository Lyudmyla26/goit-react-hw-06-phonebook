import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { InputField } from 'components/Imput/Imput';

import { addContact } from 'redux/contactSlice';
import { getContactList } from 'redux/selectors';

import style from './ContactForm.module.css';
function validateName(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (
    !/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/.test(value)
  ) {
    error = 'Invalid name';
  }
  return error;
}

function validateNumber(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (
    !/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/.test(
      value
    )
  ) {
    error = 'Invalid Number';
  }
  return error;
}
function isOnList(list = [], value) {
  const isOnList = list.findIndex(item => item.name === value);

  return isOnList !== -1;
}

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contactList = useSelector(getContactList);

  const resetInputs = () => {
    setName('');
    setNumber('');
  };

  const canBeSubmitted = () => {
    const errors = {
      name: Boolean(validateName(name)),
      number: Boolean(validateNumber(number)),
    };
    const isDisabled = Object.keys(errors).some(error => errors[error]);

    return !isDisabled;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isOnList(contactList, name)) {
      return alert('Contact with this name already in list');
    }
    dispatch(addContact(name, number));
    resetInputs();
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: name,
        number: number,
      }}
    >
      {({ errors }) => (
        <Form onSubmit={handleSubmit} className={style.contact__form}>
          <label className={style.contact__label}>
            Name
            <InputField
              validate={validateName}
              type="text"
              name="name"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              changeState={setName}
              className={errors.name && 'error'}
              validateOnChange={true}
            />
          </label>
          <InputField />
          <label className={style.contact__label}>
            Phone
            <InputField
              validate={validateNumber}
              type="tel"
              name="number"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              changeState={setNumber}
              className={errors.number && 'error'}
              validateOnChange={true}
            />
          </label>
          <button disabled={!canBeSubmitted()} type="submit">
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};
