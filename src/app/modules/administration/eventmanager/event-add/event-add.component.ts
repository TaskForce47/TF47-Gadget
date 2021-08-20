import { Component, OnInit } from '@angular/core';
import eventAddForm from '../../../../core/forms/event-add';
import { HttpClient } from '@angular/common/http';
import { Mission } from '../../../../core/models/Gadget';
import { FormSettingsNew, Tf47FormNewComponent } from 'src/app/ui/tf47-form-new/tf47-form-new.component';
import { Observable, of } from 'rxjs';
import { FormFieldModel } from 'src/app/core/models/form-field.model';

@Component({
	selector: 'app-event-add',
	templateUrl: './event-add.component.html',
	styleUrls: ['./event-add.component.scss'],
})
export class EventAddComponent implements OnInit {
	public formFields = eventAddForm;
  public formSettings: FormSettingsNew = {
    hooks: {
      initFormHooks: [
        {
          execute(form: Tf47FormNewComponent): Observable<FormFieldModel> {
            const field = form.formFieldMap.get('missionType');
            field.options = [{label: "COOP", value: "coop"}, {label: "TvT", value: "tvt"}];
            return of(field);
          }
        }
      ]
    }
  }
	constructor(private http: HttpClient) {}

	ngOnInit(): void {}

	public addEvent($event: Mission) {
		const payload = {
			name: $event.name,
			description: $event.descriptionShort,
			missionType: $event.missionType,
			campaignId: 1,
		};
		this.http.post('/Mission', payload, { withCredentials: true }).subscribe((res) => {});
	}
}
