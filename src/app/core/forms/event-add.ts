import { FormFieldModel } from '../models/form-field.model';

const eventAddForm: Array<FormFieldModel> = [
	{
		field: 'name',
    displayName: 'Name',
		type: 'TEXT',
		required: true,
	},
	{
		field: 'descriptionShort',
    displayName: 'Description Short',
		type: 'TEXTAREA',
		required: true,
	},
	{
		field: 'missionType',
    displayName: 'Type',
		type: 'SELECT',
		required: true,
	},
  {
		field: 'slottingTime',
    displayName: 'Slotting Time',
		type: 'DATE',
		required: true,
	},
  {
		field: 'briefingTime',
    displayName: 'Briefing Time',
		type: 'DATE',
		required: true,
	},
  {
		field: 'startTime',
    displayName: 'Start Time',
		type: 'DATE',
		required: true,
	},
  {
		field: 'endTime',
    displayName: 'End Time',
		type: 'DATE',
		required: true,
	},
];

export default eventAddForm;
