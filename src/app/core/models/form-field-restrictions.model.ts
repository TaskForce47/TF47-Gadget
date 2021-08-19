class NumberFieldRestrictionsModel {
	min?: number;
	max?: number;
	step?: number;
	minFractionDigits?: number;
	maxFractionDigits?: number;
	mode?: 'decimal' | 'currency';
	prefix?: string;
	suffix?: string;
	currency?: string;
	currencyDisplay?: string;
}
export class FormFieldRestrictionsModel {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
	numberField?: NumberFieldRestrictionsModel;
}
