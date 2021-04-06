import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Header, SortMeta } from 'primeng/api';
import dayjs from 'dayjs';

export interface GridSettings {
	endpointUrl: string;
}

export interface ConditionModel {
	field: string;
	operator: 'eq' | 'gt' | 'lt' | 'ge' | 'le';
	value: string | number;
}

export interface HeaderButton {
	title: string;
	action: string;
	condition?: ConditionModel;
	selectable?: boolean;
	disabled?: boolean;
}

interface FieldSetting {
	styling: Array<{ class: string; condition: ConditionModel }>;
}

export interface FieldSettings {
	[fieldName: string]: FieldSetting;
}

@Component({
	selector: 'tf47-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
	constructor() {}
	public tableHeaders: Array<{ field: string; header: string }> = [];
	public tableHeadersFields: Array<string> = [];
	public testModel;
	@Input() fieldSettings: FieldSettings;
	@Input() gridSettings: GridSettings;
	@Input() data: Array<any>;
	@Input() headers: Array<{ field: string; header: string }> = [];
	@Input() defaultHeaders: Array<string> = [];
	@Input() selectedValues: string[] = [];
	@Input() rows: number = 20;
	@Input() silentReload: boolean;
	@Input() dataLoading: boolean;
	@Input() static: boolean = false;
	@Input() first: number;
	@Input() reordableColumns: boolean;
	@Input() resizeableColumns: boolean = false;
	@Input() scrollHeight: string;
	@Input() scrollable: boolean;
	@Input() compareSelectionBy: string;
	@Input() dataKey: string = 'ID';
	@Input() totalRecords: any;
	@Input() pageLinks: number;
	@Input() selectionMode: string = 'off';
	@Input() paginator: boolean = true;
	@Input() autoLayout: boolean;
	@Input() sort: SortMeta[];
	@Input() sortMode: string = 'single';
	@Input() selectedItems: any = null;
	@Input() showCurrentPageReport: boolean = true;
	@Input() rowsPerPageOptions: Array<number>;
	@Input() stateKey: string;
	@Input() sortOrder: number = 1;
	@Input() sortField: string;
	@Input() lazy: boolean = true;
	@Input() disableSorting: boolean = false;
	@Output() onRowSelect: EventEmitter<any> = new EventEmitter();
	@Output() onPage: EventEmitter<any> = new EventEmitter();
	@Output() onManualReload: EventEmitter<any> = new EventEmitter();
	@Output() onHeaderButtonClicked: EventEmitter<any> = new EventEmitter();
	@Input() headerActions: HeaderButton[] = [];
	ngOnInit(): void {
		this.applyFieldSettings();
	}

	ngOnChanges(changes: SimpleChanges) {
		this.init();
	}

	private init() {
		this.selectedItems = null;
		this.tableHeaders = [];
		this.tableHeadersFields = [];
		this.defaultHeaders.forEach((dHeader) => {
			this.headers.forEach((header) => {
				if (dHeader === header.field) {
					this.tableHeaders.push(header);
					this.tableHeadersFields.push(dHeader);
				}
			});
		});
		if (this.headerActions) {
			this.headerActions.forEach((action, index) => {
				if (action.selectable) {
					this.headerActions[index].disabled = true;
				}
			});
		}
	}
	public onRowSelectEvent($event: any) {
		this.onRowSelect.emit($event);
		if (this.headerActions?.length === 0) return;
		this.headerActions.forEach((action, index) => {
			if (action.selectable && !action.condition) {
				this.headerActions[index].disabled = false;
			} else if (action.selectable && action.condition) {
				if (this.validateHeader(action)) {
					this.headerActions[index].disabled = false;
				} else {
					this.headerActions[index].disabled = true;
				}
			}
		});
	}
	public onPageEvent($event: any) {
		this.onPage.emit($event);
	}

	public tHeadChange($event: any, col: { field: string; header: string }) {
		if ($event.checked) {
			this.tableHeaders.push(col);
		} else {
			this.tableHeaders.splice(this.tableHeaders.indexOf(col), 1);
		}
	}

	public reloadTable($event: MouseEvent) {
		this.onManualReload.emit($event);
	}

	public checkType(rowData: any) {
		if (typeof rowData === 'number') {
			return rowData;
		}
		if (!rowData.includes('T')) {
			return rowData;
		}
		const date = dayjs(rowData);
		if (date.isValid()) {
			return date.format('DD.MM.YYYY HH:MM');
		} else {
			return rowData;
		}
	}

	public applyStyling(field, value) {
		if (this.fieldSettings && Object.keys(this.fieldSettings).includes(field)) {
			let styleClass = '';
			this.fieldSettings[field].styling.some((styling) => {
				if (this.checkCondition(value, styling.condition) && styleClass === '') {
					styleClass = styling.class;
					return styleClass;
				}
			});
			return styleClass;
		}
	}

	public applyFieldSettings() {}

	private checkCondition(value, condition: ConditionModel) {
		switch (condition.operator) {
			case 'eq':
				return value === condition.value;
			case 'gt':
				return value > condition.value;
			case 'lt':
				return value < condition.value;
			case 'ge':
				return value >= condition.value;
			case 'le':
				return value <= condition.value;
		}
	}

	public headerButtonClicked($event: MouseEvent, action: string, data: any) {
		this.onHeaderButtonClicked.emit([$event, action, data]);
	}

	validateHeader(headerAction: HeaderButton) {
		return this.checkCondition(this.selectedItems[headerAction.condition.field], headerAction.condition);
	}
}
