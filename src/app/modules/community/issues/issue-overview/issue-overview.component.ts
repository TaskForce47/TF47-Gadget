import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from '../../../../ui/modal/modal.component';
import {
	DynamicFormGroupModel,
	DynamicFormModel,
	DynamicFormService,
	DynamicInputModel,
	DynamicSelectModel,
} from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { PermissionService } from '../../../../core/services/permission.service';
export interface IssueGroup {
	issueGroupId: number;
	groupName: string;
	groupDescription: string;
	timeGroupCreated: string;
	issues?: (IssuesEntity | null)[] | null;
}
export interface IssuesEntity {
	issueId: number;
	title: string;
	isClosed: boolean;
	issueCreator: string;
	creatorName: string;
	timeCreated: string;
	timeLastUpdated: string;
	issueGroupId: number;
	issueGroupName?: string;
	issueItems?: null[] | null;
	issueTags?: IssueTagsEntity[] | null;
}
export interface IssueTagsEntity {
	issueTagId: number;
	tagName: string;
	color: string;
}

@Component({
	templateUrl: './issue-overview.component.html',
	styleUrls: ['./issue-overview.component.scss'],
})
export class IssueOverviewComponent implements OnInit {
	issues: IssuesEntity[];
	issueGroups: IssueGroup[];
	sortField: any;
	sortOptions: any;
	sortKey: any;
	sortOrder: any;
	@ViewChild('addModal') addModal: ModalComponent;
	myFormModel: DynamicFormModel = [];
	myFormGroup: FormGroup;
	formReady: boolean = false;
	constructor(
		private http: HttpClient,
		private formService: DynamicFormService,
		public permissionService: PermissionService
	) {}

	ngOnInit(): void {
		this.loadData();
	}

	loadData() {
		forkJoin([
			this.http.get('/Issue', { withCredentials: true }),
			this.http.get('/IssueGroup', { withCredentials: true }),
			this.http.get('/IssueTag', { withCredentials: true }),
		]).subscribe(([arrIssue, arrIssueGroup, arrIssueTag]: [IssuesEntity[], IssueGroup[], IssueTagsEntity[]]) => {
			this.issues = arrIssue;

			this.issues.forEach((issue, i) => {
				const arr = arrIssueGroup.filter((issueGroup) => issueGroup.issueGroupId === issue.issueGroupId);
				if (arr.length) {
					this.issues[i].issueGroupName = arr[0].groupName;
				}
			});
			const arrIssueGroupTmp = [];
			const arrIssueTagTmp = [];
			arrIssueGroup.forEach((issueGroup) => {
				arrIssueGroupTmp.push({ label: issueGroup.groupName, value: issueGroup.issueGroupId });
			});
			arrIssueTag.forEach((issueGroup) => {
				arrIssueTagTmp.push({ label: issueGroup.tagName, value: issueGroup.issueTagId });
			});
			this.myFormModel.push(
				new DynamicFormGroupModel({
					id: 'issue',
					group: [
						new DynamicInputModel({
							id: 'title',
							label: 'Title',
							required: true,
						}),
						new DynamicSelectModel({
							id: 'tags',
							label: 'Tags',
							options: arrIssueTagTmp,
							additional: {
								appendTo: 'body',
							},
							multiple: true,
						}),
						new DynamicSelectModel({
							id: 'issueGroupId',
							label: 'Issue Group',
							options: arrIssueGroupTmp,
							additional: {
								appendTo: 'body',
							},
						}),
					],
				})
			);
			this.myFormGroup = this.formService.createFormGroup(this.myFormModel);
			this.formReady = true;
		});
	}

	onSortChange($event: any) {}

	submit() {
		this.http.post('/Issue', this.myFormGroup.getRawValue().issue, { withCredentials: true }).subscribe(() => {
			this.loadData();
			this.addModal.close();
		});
	}
}
