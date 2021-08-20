class NumberFieldRestrictionsModel {
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
  min?: number;
	max?: number;
  multi?: boolean;
	numberField?: NumberFieldRestrictionsModel;
}
