import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { IssueGroup, IssuesEntity, IssueTagsEntity } from '../issue-overview/issue-overview.component';
import {
	DynamicFormGroupModel,
	DynamicFormModel,
	DynamicFormService,
	DynamicInputModel,
	DynamicSelectModel,
	DynamicTextAreaModel,
} from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { ModalComponent } from '../../../../ui/modal/modal.component';
import { User } from '../../../../core/models/Gadget';
import { PermissionService } from '../../../../core/services/permission.service';

@Component({
	templateUrl: './issue-profile.component.html',
	styleUrls: ['./issue-profile.component.scss'],
})
export class IssueProfileComponent implements OnInit {
	public id: number;
	public issue: IssuesEntity;
	public issueCreator: User;
	public loading: boolean = true;
	public user;
	@ViewChild('editIssueModal') editIssueModal: ModalComponent;
	@ViewChild('editIssueItemModal') editIssueItemModal: ModalComponent;
	myFormModel: DynamicFormModel = [
		new DynamicFormGroupModel({
			id: 'issueItem',
			group: [
				new DynamicInputModel({
					id: 'issueId',
					inputType: 'number',
					required: true,
					hidden: true,
				}),
				new DynamicTextAreaModel({
					id: 'message',
					required: true,
					label: 'Comment',
				}),
			],
		}),
	];
	editIssueItemFormModel: DynamicFormModel = [
		new DynamicFormGroupModel({
			id: 'issueItem',
			group: [
				new DynamicInputModel({
					id: 'issueItemId',
					inputType: 'number',
					required: true,
					hidden: true,
				}),
				new DynamicTextAreaModel({
					id: 'message',
					required: true,
					label: 'Comment',
				}),
			],
		}),
	];
	public myFormGroup: FormGroup;
	public editIssueFormGroup: FormGroup;
	public editIssueItemFormGroup: FormGroup;
	public editIssueFormModel: DynamicFormModel = [];
	public issueEdit: boolean = false;
	public requestInProgress = false;
	constructor(
		private http: HttpClient,
		private activatedRoute: ActivatedRoute,
		private formService: DynamicFormService,
		private auth: AuthService,
		public permissionService: PermissionService
	) {}

	ngOnInit(): void {
		this.myFormGroup = this.formService.createFormGroup(this.myFormModel);
		this.editIssueItemFormGroup = this.formService.createFormGroup(this.editIssueItemFormModel);
		this.activatedRoute.params.subscribe((params) => {
			this.id = params.id;
			this.myFormGroup.patchValue({ issueItem: { issueId: this.id } });
			this.http.get('/Issue/' + this.id, { withCredentials: true }).subscribe((issue: IssuesEntity) => {
				this.issue = issue;
				forkJoin([
					this.http.get('/IssueGroup/' + this.issue.issueGroupId, { withCredentials: true }),
					this.http.get('/User/' + this.issue.issueCreator, { withCredentials: true }),
					this.auth.details$,
				]).subscribe(([issueGroup, issueCreator, user]: [IssueGroup, User, User]) => {
					this.issue.issueGroupName = issueGroup.groupName;
					this.issueCreator = issueCreator;
					this.user = user;
					this.loading = false;
				});
			});
		});
	}

	public addComment() {
		this.http
			.post('/IssueItem', this.myFormGroup.getRawValue().issueItem, { withCredentials: true })
			.subscribe(() => {
				this.myFormGroup.reset();
				this.myFormGroup.patchValue({ issueItem: { issueId: this.id } });
				this.reloadIssue();
			});
	}

	public reloadIssue() {
		this.http.get('/Issue/' + this.id, { withCredentials: true }).subscribe((issue: IssuesEntity) => {
			this.issue = issue;
		});
	}
	public initEditIssueItem(issueItem) {
		console.log(issueItem);
		this.editIssueItemFormGroup.patchValue({
			issueItem: { message: issueItem.message, issueItemId: issueItem.issueItemId },
		});
		this.editIssueItemModal.open();
	}

	public initEditIssueForm() {
		forkJoin([
			this.http.get('/Issue/' + this.id, { withCredentials: true }),
			this.http.get('/IssueTag', { withCredentials: true }),
		]).subscribe(([issue, arrIssueTag]: [IssuesEntity, IssueTagsEntity[]]) => {
			this.issue = issue;
			const arrIssueTagTmp = [];
			arrIssueTag.forEach((issueGroup) => {
				arrIssueTagTmp.push({ label: issueGroup.tagName, value: issueGroup.issueTagId });
			});
			this.editIssueFormModel.push(
				new DynamicFormGroupModel({
					id: 'issue',
					group: [
						new DynamicInputModel({
							id: 'title',
							label: 'Title',
							required: true,
							value: issue.title,
						}),
						new DynamicSelectModel({
							id: 'tags',
							label: 'Tags',
							options: arrIssueTagTmp,
							additional: {
								appendTo: 'body',
							},
							value: issue.issueTags.map((tag) => tag.issueTagId),
							multiple: true,
						}),
					],
				})
			);
			this.editIssueFormGroup = this.formService.createFormGroup(this.editIssueFormModel);
			this.issueEdit = true;
			this.editIssueModal.open();
		});
	}

	public editIssue() {
		this.requestInProgress = true;
		this.http
			.put('/Issue/' + this.id, this.editIssueFormGroup.getRawValue().issue, { withCredentials: true })
			.subscribe(
				() => {
					this.reloadIssue();
					this.requestInProgress = false;
					this.editIssueModal.close();
				},
				() => {
					this.requestInProgress = false;
				}
			);
	}

	public editIssueItem() {
		this.requestInProgress = true;
		this.http
			.put(
				'/IssueItem/' + this.editIssueItemFormGroup.getRawValue().issueItem.issueItemId,
				{ message: this.editIssueItemFormGroup.getRawValue().issueItem.message },
				{ withCredentials: true }
			)
			.subscribe(
				() => {
					this.reloadIssue();
					this.requestInProgress = false;
					this.editIssueItemModal.close();
				},
				() => {
					this.requestInProgress = false;
				}
			);
	}
}
