import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DataViewModule } from 'primeng/dataview';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { PaginatorModule } from 'primeng/paginator';
import { PickListModule } from 'primeng/picklist';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SlideMenuModule } from 'primeng/slidemenu';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { DragDropModule } from 'primeng/dragdrop';
import { BlockUIModule } from 'primeng/blockui';
import { DeferModule } from 'primeng/defer';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { TerminalModule } from 'primeng/terminal';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { MegaMenuComponent } from './mega-menu/mega-menu.component';
import { TableComponent } from './table/table.component';
import { SubnaviComponent } from './subnavi/subnavi.component';
import { ModalComponent } from './modal/modal.component';
import { ChipModule } from 'primeng/chip';
import { Tf47ChartComponent } from './tf47-chart/tf47-chart.component';
import { SafeUrlPipe } from '../core/pipes/url.pipe';
import '@fullcalendar/angular';
import { Tf47CalendarComponent } from './tf47-calendar/tf47-calendar.component';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { Tf47DataViewComponent } from './tf47-data-view/tf47-data-view.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { TimelineModule } from 'primeng/timeline';
import { Tf47EditorComponent } from './tf47-editor/tf47-editor.component';
import { CalendarModule } from 'primeng/calendar';
import { MarkdownModule } from 'ngx-markdown';
import { Tf47FormComponent } from './tf47-form/tf47-form.component';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { Tf47FormNewComponent } from './tf47-form-new/tf47-form-new.component';
import { FormElementWrapperComponent } from './form/form-element-wrapper/form-element-wrapper.component';
import { Tf47TextComponent } from './form/form-elements/tf47-text/tf47-text.component';
import { Tf47NumberComponent } from './form/form-elements/tf47-number/tf47-number.component';
import { Tf47DateComponent } from './form/form-elements/tf47-date/tf47-date.component';
import { Tf47SelectComponent } from './form/form-elements/tf47-select/tf47-select.component';
import { Tf47RadioComponent } from './form/form-elements/tf47-radio/tf47-radio.component';
import { Tf47CheckboxComponent } from './form/form-elements/tf47-checkbox/tf47-checkbox.component';
import { Tf47ColorpickerComponent } from './form/form-elements/tf47-colorpicker/tf47-colorpicker.component';
import { Tf47TextareaComponent } from './form/form-elements/tf47-textarea/tf47-textarea.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { Tf47MultiselectComponent } from './form/form-elements/tf47-multiselect/tf47-multiselect.component';
FullCalendarModule.registerPlugins([dayGridPlugin, interactionPlugin, timeGridPlugin]);

@NgModule({
	declarations: [
		BreadcrumbsComponent,
		MegaMenuComponent,
		TableComponent,
		SubnaviComponent,
		ModalComponent,
		Tf47ChartComponent,
		SafeUrlPipe,
		Tf47CalendarComponent,
		Tf47DataViewComponent,
		Tf47EditorComponent,
		Tf47FormComponent,
    Tf47FormNewComponent,
    FormElementWrapperComponent,
    Tf47TextComponent,
    Tf47NumberComponent,
    Tf47DateComponent,
    Tf47SelectComponent,
    Tf47RadioComponent,
    Tf47CheckboxComponent,
    Tf47ColorpickerComponent,
    Tf47TextareaComponent,
    Tf47MultiselectComponent
	],
	imports: [
		CommonModule,
		CheckboxModule,
		ChipsModule,
		ColorPickerModule,
		DropdownModule,
		EditorModule,
		InputMaskModule,
		InputSwitchModule,
		InputTextModule,
		InputTextareaModule,
		InputNumberModule,
		KeyFilterModule,
		ListboxModule,
		MultiSelectModule,
		PasswordModule,
		RadioButtonModule,
		RatingModule,
		SliderModule,
		SelectButtonModule,
		ToggleButtonModule,
		TriStateCheckboxModule,
		ButtonModule,
		SplitButtonModule,
		DataViewModule,
		OrderListModule,
		OrganizationChartModule,
		PaginatorModule,
		PickListModule,
		TableModule,
		TreeModule,
		TreeTableModule,
		VirtualScrollerModule,
		AccordionModule,
		CardModule,
		FieldsetModule,
		PanelModule,
		ScrollPanelModule,
		TabViewModule,
		ToolbarModule,
		ConfirmDialogModule,
		DialogModule,
		DynamicDialogModule,
		OverlayPanelModule,
		SidebarModule,
		TooltipModule,
		MenuModule,
		BreadcrumbModule,
		ContextMenuModule,
		MegaMenuModule,
		MenubarModule,
		PanelMenuModule,
		SlideMenuModule,
		StepsModule,
		TabMenuModule,
		TieredMenuModule,
		MessagesModule,
		MessageModule,
		ToastModule,
		CarouselModule,
		GalleriaModule,
		DragDropModule,
		BlockUIModule,
		DeferModule,
		ProgressBarModule,
		ProgressSpinnerModule,
		RippleModule,
		TerminalModule,
		ChipModule,
		FullCalendarModule,
    CalendarModule,
		DividerModule,
		TagModule,
		TimelineModule,
		MarkdownModule.forRoot(),
		DynamicFormsPrimeNGUIModule,
		ReactiveFormsModule,
		NgxEditorModule,
    NgxMasonryModule
	],
	exports: [
		CheckboxModule,
		ChipsModule,
		ColorPickerModule,
		DropdownModule,
		EditorModule,
		InputMaskModule,
		InputSwitchModule,
		InputTextModule,
		InputTextareaModule,
		InputNumberModule,
		KeyFilterModule,
		ListboxModule,
		MultiSelectModule,
		PasswordModule,
		RadioButtonModule,
		RatingModule,
		SliderModule,
		SelectButtonModule,
		ToggleButtonModule,
		TriStateCheckboxModule,
		ButtonModule,
		SplitButtonModule,
		DataViewModule,
		OrderListModule,
		OrganizationChartModule,
		PaginatorModule,
		PickListModule,
		TableModule,
		TreeModule,
		TreeTableModule,
		VirtualScrollerModule,
		AccordionModule,
		CardModule,
		FieldsetModule,
		PanelModule,
		ScrollPanelModule,
		TabViewModule,
		ToolbarModule,
		ConfirmDialogModule,
		DialogModule,
		DynamicDialogModule,
		OverlayPanelModule,
		SidebarModule,
		TooltipModule,
		MenuModule,
		BreadcrumbModule,
		ContextMenuModule,
		MegaMenuModule,
		MenubarModule,
		PanelMenuModule,
		SlideMenuModule,
		StepsModule,
		TabMenuModule,
		TieredMenuModule,
		MessagesModule,
		MessageModule,
		ToastModule,
		CarouselModule,
		GalleriaModule,
		DragDropModule,
		BlockUIModule,
		DeferModule,
		ProgressBarModule,
		ProgressSpinnerModule,
		RippleModule,
		TerminalModule,
		BreadcrumbsComponent,
		MegaMenuComponent,
		TableComponent,
		SubnaviComponent,
		ModalComponent,
		ChipModule,
		Tf47ChartComponent,
		SafeUrlPipe,
		FullCalendarModule,
		Tf47CalendarComponent,
		DividerModule,
		TagModule,
		TimelineModule,
		Tf47EditorComponent,
		CalendarModule,
		MarkdownModule,
		Tf47FormComponent,
		Tf47EditorComponent,
    Tf47FormNewComponent,
    NgxMasonryModule
	],
})
export class UiModule {}
