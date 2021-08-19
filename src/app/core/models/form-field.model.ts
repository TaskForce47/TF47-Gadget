import { FormOptionModel } from './form-field-options.model';
import { FormFieldRestrictionsModel } from './form-field-restrictions.model';

export class FormFieldModel {
	field: string;
  displayName: string;
	type: string;
	options?: FormOptionModel[];
	required?: boolean;
	restrictions?: FormFieldRestrictionsModel;
}
