import { FormFieldSetModel } from '../models/form-fieldset.model';

const eventAddForm: Array<Array<FormFieldSetModel>> = [
	[
		{
			fields: [
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
					type: 'DATE'
				},
				{
					field: 'briefingTime',
					displayName: 'Briefing Time',
					type: 'DATE'
				},
				{
					field: 'startTime',
					displayName: 'Start Time',
					type: 'DATE'
				},
				{
					field: 'endTime',
					displayName: 'End Time',
					type: 'DATE'
				},
				{
					field: 'requiredDLCs',
					displayName: 'Required DLCs',
					type: 'MULTISELECT',
          options: [
            {label: "Art of War", value: 'aow'},
            {label: "Apex", value: 'apex'},
            {label: "Contact", value: 'contact'},
            {label: "CSLA Iron Curtain", value: 'csla'},
            {label: "Global Mobilization - Cold War", value: 'gm'},
            {label: "Helicopters", value: 'helicopters'},
            {label: "Jets", value: 'jets'},
            {label: "Laws of War", value: 'laws-of-war'},
            {label: "Marksmen", value: 'marksmen'},
            {label: "Tac Ops", value: 'tac-ops'},
            {label: "Tanks", value: 'tanks'},
            {label: "S.O.G. Prairie Fire", value: 'vn'}
          ]
				}
			],
		},
	],
];

export default eventAddForm;
