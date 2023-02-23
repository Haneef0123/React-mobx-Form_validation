import React, { useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { TextField, Button } from '@material-ui/core';
import { debounce } from 'lodash';

import useStores from '../hooks/useStores';
import useStyles from '../styles/FormStyles';

interface InputProps {
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  helperText: string;
}

const Input: React.FC<InputProps> = React.memo(({ name, label, value, onChange, error, helperText }) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  );
});

const MyForm: React.FC = observer(() => {
  const { validationStore } = useStores();
  const [state, setState] = useState({
    email1: '',
    email2: '',
  });
  const classes = useStyles();

  const validateFieldDebounced = useCallback(
    debounce((name: string, value: string) => {
      validationStore.validateField(name, value);
    }, 500),
    [validationStore]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = event.target;
      setState((prevState) => ({ ...prevState, [name]: value }));
      validateFieldDebounced(name, value);
    },
    [validateFieldDebounced]
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      if (validationStore.isValid) {
        alert('Form is valid and ready to submit!');
      } else {
        alert('Form is invalid. Please fix errors before submitting.');
      }
    },
    [validationStore]
  );

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Input
        name="email1"
        label="Email Address"
        value={state.email1}
        onChange={handleChange}
        error={!!(validationStore.fields.email1 && validationStore.fields.email1.error)}
        helperText={validationStore.fields.email1?.error}
      />
      <Input
        name="email2"
        label="Confirm Email Address"
        value={state.email2}
        onChange={handleChange}
        error={!!(validationStore.fields.email2 && validationStore.fields.email2.error)}
        helperText={validationStore.fields.email2?.error}
      />
      <Button className={classes.button} type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
});

export default MyForm;
