import { FormFieldModel } from "../models/form-field.model";

const eventAddForm: Array<FormFieldModel> = [
	{
    dataType: 'string',
    view: {
      disabled: false,
      readonly: false
    },
    information: {
      name: 'name',
      displayName: 'Name'
    }
  }
];

export default eventAddForm;
