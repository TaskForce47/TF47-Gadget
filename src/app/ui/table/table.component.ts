import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Header, SortMeta } from 'primeng/api';
import dayjs from 'dayjs';
import { PermissionService } from '../../core/services/permission.service';
import { ModalComponent } from '../modal/modal.component';

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
	permissions?: string[];
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
	constructor(private permissionService: PermissionService) {}
	public tableHeaders: Array<{ field: string; header: string }> = [];
	public tableHeadersFields: Array<string> = [];
	public tableReady = false;
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
	@Input() reordableColumns: boolean = false;
	@Input() resizeableColumns: boolean = false;
	@Input() scrollHeight: string;
	@Input() scrollable: boolean = false;
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
	@Input() enableExport: boolean = false;
	@Input() disableSorting: boolean = false;
	@Output() onRowSelect: EventEmitter<any> = new EventEmitter();
	@Output() onPage: EventEmitter<any> = new EventEmitter();
	@Output() onManualReload: EventEmitter<any> = new EventEmitter();
	@Output() onHeaderButtonClicked: EventEmitter<any> = new EventEmitter();
	@Input() headerActions: HeaderButton[] = [];

	@ViewChild('exportModal') exportModal: ModalComponent;
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
			const tmpHeader = [];
			this.headerActions.forEach((action, index) => {
				if (action.permissions?.length > 0) {
					if (!action.permissions.every((permission) => this.permissionService.hasPermission(permission))) {
						return;
					}
				}
				if (action.selectable) {
					this.headerActions[index].disabled = true;
				}
				tmpHeader.push(action);
			});
			this.headerActions = tmpHeader;
		}
		this.tableReady = true;
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
		if (typeof rowData !== 'string') {
			return rowData;
		}
		if (rowData.includes('T') && rowData.includes(':') && rowData.includes('-')) {
			const date = dayjs(rowData);
			if (date.isValid()) {
				return date.format('DD.MM.YYYY HH:MM');
			} else {
				return rowData;
			}
		}
		return rowData;
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

	public validateHeader(headerAction: HeaderButton) {
		return this.checkCondition(this.selectedItems[headerAction.condition.field], headerAction.condition);
	}

	public openExportModal() {
		this.exportModal.open();
	}

	export() {
		this.exportExcel();
	}

	exportExcel() {
		import('xlsx').then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(this.data);
			const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
			const excelBuffer: any = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array',
			});
			this.saveAsExcelFile(excelBuffer, 'data');
		});
	}

	saveAsExcelFile(buffer: any, fileName: string): void {
		import('file-saver').then((FileSaver) => {
			const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
			const EXCEL_EXTENSION = '.xlsx';
			const data: Blob = new Blob([buffer], {
				type: EXCEL_TYPE,
			});
			FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
			this.exportModal.close();
		});
	}
}
