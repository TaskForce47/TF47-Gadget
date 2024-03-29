const donationAddForm = [
	{
		asyncValidators: null,
		errorMessages: null,
		hidden: false,
		id: 'donation',
		label: null,
		labelTooltip: null,
		controlTooltip: null,
		layout: null,
		name: 'donation',
		relations: [],
		updateOn: null,
		validators: null,
		disabled: false,
		group: [
			{
				asyncValidators: null,
				errorMessages: null,
				hidden: true,
				id: 'userId',
				label: null,
				labelTooltip: null,
				controlTooltip: null,
				layout: null,
				name: 'userId',
				relations: [],
				updateOn: null,
				validators: null,
				disabled: false,
				additional: null,
				hint: null,
				required: true,
				tabIndex: null,
				value: null,
				autoComplete: 'on',
				autoFocus: false,
				maxLength: null,
				minLength: null,
				placeholder: '',
				prefix: null,
				readOnly: false,
				spellCheck: false,
				suffix: null,
				list: null,
				type: 'INPUT',
				accept: null,
				inputType: 'text',
				mask: null,
				max: null,
				min: null,
				multiple: null,
				pattern: null,
				step: null,
			},
			{
				asyncValidators: null,
				errorMessages: null,
				hidden: false,
				id: 'amount',
				label: 'Amount',
				labelTooltip: null,
				controlTooltip: null,
				layout: null,
				name: 'amount',
				relations: [],
				updateOn: null,
				validators: null,
				disabled: false,
				additional: null,
				hint: null,
				required: true,
				tabIndex: null,
				value: null,
				autoComplete: 'on',
				autoFocus: false,
				maxLength: null,
				minLength: null,
				placeholder: '',
				prefix: null,
				readOnly: false,
				spellCheck: false,
				suffix: null,
				list: null,
				type: 'INPUT',
				accept: null,
				inputType: 'text',
				mask: null,
				max: null,
				min: null,
				multiple: null,
				pattern: null,
				step: null,
			},
			{
				asyncValidators: null,
				errorMessages: null,
				hidden: false,
				id: 'timeOfDonation',
				label: 'Donated at',
				labelTooltip: null,
				controlTooltip: null,
				layout: null,
				name: 'timeOfDonation',
				relations: [],
				updateOn: null,
				validators: null,
				disabled: false,
				additional: null,
				hint: null,
				required: true,
				tabIndex: null,
				value: null,
				format: null,
				max: null,
				min: null,
				placeholder: null,
				type: 'DATEPICKER',
				autoFocus: false,
				focusedDate: null,
				inline: false,
				prefix: null,
				readOnly: false,
				toggleIcon: null,
				toggleLabel: null,
				suffix: null,
			},
			{
				asyncValidators: null,
				errorMessages: null,
				hidden: false,
				id: 'note',
				label: 'Note',
				labelTooltip: null,
				controlTooltip: null,
				layout: null,
				name: 'note',
				relations: [],
				updateOn: null,
				validators: null,
				disabled: false,
				additional: null,
				hint: null,
				required: true,
				tabIndex: null,
				value: ' ',
				autoComplete: 'on',
				autoFocus: false,
				maxLength: null,
				minLength: null,
				placeholder: '',
				prefix: null,
				readOnly: false,
				spellCheck: false,
				suffix: null,
				type: 'TEXTAREA',
				cols: 20,
				rows: 2,
				wrap: 'soft',
			},
		],
		type: 'GROUP',
		legend: null,
	},
];

export default donationAddForm;
