import { makeAutoObservable } from 'mobx';

export interface Field {
  value: string;
  error: string;
}

export interface Fields {
  [name: string]: Field;
}

class ValidationStore {
  fields: Fields = {};

  constructor(fields: string[]) {
    fields.forEach((field) => {
      this.fields[field] = { value: '', error: '' };
    });

    makeAutoObservable(this);
  }

  validateField(name: string, value: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (name) {
      case 'email1':
        this.fields.email1.value = value;
        if (!value) {
          this.fields.email1.error = 'This field is required.';
        } else if (!emailRegex.test(value)) {
          this.fields.email1.error = 'Please enter a valid email address.';
        } else {
          this.fields.email1.error = '';
        }
        break;
      case 'email2':
        this.fields.email2.value = value;
        if (!value) {
          this.fields.email2.error = 'This field is required.';
        } else if (value !== this.fields.email1.value) {
          this.fields.email2.error = 'Email addresses do not match.';
        } else {
          this.fields.email2.error = '';
        }
        break;
      default:
        break;
    }
  }

  get isValid(): boolean {
    return Object.values(this.fields).every((field) => field.error === '');
  }
}

export default ValidationStore;
