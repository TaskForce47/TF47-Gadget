import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import dayjs from 'dayjs';
import { Donation, User } from '../../../core/models/Gadget';
import { PermissionService } from '../../../core/services/permission.service';
import {
	DynamicDatePickerModel,
	DynamicFormGroupModel,
	DynamicFormModel,
	DynamicFormService,
	DynamicInputModel,
	DynamicTextAreaModel,
} from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import { ModalComponent } from '../../../ui/modal/modal.component';
import { TableComponent } from '../../../ui/table/table.component';

@Component({
	templateUrl: './donation.component.html',
	styleUrls: ['./donation.component.scss'],
})
export class DonationComponent implements OnInit {
	public ready = false;
	public donationDates: string[] = [];
	public donationAmounts: number[] = [];
	public yearOptions = [
		{ name: '2019', value: 2019 },
		{ name: '2020', value: 2020 },
		{ name: '2021', value: 2021 },
		{ name: '2022', value: 2022 },
		{ name: '2023', value: 2023 },
		{ name: '2024', value: 2024 },
		{ name: '2025', value: 2025 },
		{ name: '2026', value: 2026 },
		{ name: '2027', value: 2027 },
	];
	public monthOptions = [
		{ name: '-', value: 0 },
		{ name: 'January', value: 1 },
		{ name: 'February', value: 2 },
		{ name: 'March', value: 3 },
		{ name: 'April', value: 4 },
		{ name: 'May', value: 5 },
		{ name: 'July', value: 6 },
		{ name: 'June', value: 7 },
		{ name: 'August', value: 8 },
		{ name: 'September', value: 9 },
		{ name: 'October', value: 10 },
		{ name: 'November', value: 11 },
		{ name: 'December', value: 12 },
	];
	public yearModel = dayjs().year();
	public monthModel = 0;
	public chartData = {};
	@ViewChild('addModal') addModal: ModalComponent;
	@ViewChild('selectUserModal') selectUserModal: ModalComponent;
	@ViewChild('userGrid') userGrid: TableComponent;
	formModel: DynamicFormModel = [
		new DynamicFormGroupModel({
			id: 'donation',
			group: [
				new DynamicInputModel({
					id: 'userId',
					required: true,
					hidden: true,
				}),
				new DynamicInputModel({
					id: 'amount',
					label: 'Amount',
					required: true,
				}),
				new DynamicDatePickerModel({
					id: 'timeOfDonation',
					label: 'Donated at',
					required: true,
				}),
				new DynamicTextAreaModel({
					id: 'note',
					label: 'Note',
					required: true,
					value: ' ',
				}),
			],
		}),
	];
	myFormGroup: FormGroup;
	public defaultHeadersUsers: any = [];
	public headersUsers: any = [];
	public users: User[];
	public loadingUsers: boolean = true;
	public selectedUser: User;
	constructor(
		private http: HttpClient,
		public permissionService: PermissionService,
		private formService: DynamicFormService
	) {}

	ngOnInit(): void {
		this.myFormGroup = this.formService.createFormGroup(this.formModel);
		this.defaultHeadersUsers = ['username'];
		this.headersUsers.push({ field: 'username', header: 'Username' });
		this.loadDonations();
	}

	public loadDonations() {
		const filter = this.monthModel !== 0 ? this.yearModel + '/' + this.monthModel : this.yearModel;
		this.http.get('/Donation/statistics/' + filter).subscribe((res: Donation[]) => {
			this.donationDates = res.map((donation) => dayjs(donation.timeOfDonation).format('HH:mm:s DD.MM.YYYY'));
			this.donationAmounts = res.map((donation) => donation.amount);
			this.chartData = {
				labels: this.donationDates,
				datasets: [
					{
						label: 'Donation',
						data: this.donationAmounts,
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(255, 159, 64, 0.2)',
							'rgba(255, 205, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(201, 203, 207, 0.2)',
						],
					},
				],
			};

			this.ready = true;
		});
	}

	public addDonation() {
		this.http.post('/Donation', this.myFormGroup.getRawValue().donation, { withCredentials: true }).subscribe(() => {
			this.loadDonations();
			this.addModal.close();
		});
	}

	public loadUser() {
		this.loadingUsers = true;
		this.http.get('/User/', { withCredentials: true }).subscribe((res: User[]) => {
			this.users = res;
			this.loadingUsers = false;
		});
	}

	public selectUser() {
		this.selectedUser = this.userGrid.selectedItems;
		this.myFormGroup.patchValue({ userId: this.selectedUser.userId });
		this.selectUserModal.close();
	}

	public initUserModal() {
		this.loadUser();
		this.addModal.open();
	}
}
