import { ChangeEvent, Component } from "react";
import { Validator } from "./Validator";

type GenericObjectType = {[index: string]: any};
export abstract class FormGroup<FormDataType extends GenericObjectType, ErrorsType, PropsType> extends Component<PropsType, any>{
	public invalid: boolean = false;
	public btnLabel: string = "Enviar";
	public loading?: boolean = false;
	public success?: boolean = false;
	
	protected values: any = {};
	
	private errorsList: any = {};
	
	protected constructor(
		props: PropsType,
		private validator: Validator
	) {
		super(props);
	}
	
	public initForm(initialState: FormDataType) {
		Object.keys(initialState).forEach(prop => {
			this.values[prop] = initialState[prop];
		});
		this.validateForm();
	}
	
	public reset(btnLabel?: string) {
		this.loading = false;
		this.success = false;
		if (btnLabel) this.btnLabel = btnLabel;
		this.values = {};
		this.validateForm();
	}
	
	public handle(prop: keyof FormDataType) {
		return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { value: unknown }>) => {
			this.values[prop] = event.target.value;
			this.validate(prop)(event);
			this.setState(this);
		}
	}
	
	public setLoader(loading: boolean, success?: boolean, label?: string) {
		this.loading = loading;
		this.success = success;
		if (label) this.btnLabel = label;
		this.setState(this);
	}
	
	public errors(): ErrorsType {
		return this.errorsList;
	}
	
	public getRawValue(): FormDataType {
		return this.values;
	}
	
	private validate(prop: keyof FormDataType) {
		return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { value: unknown }>) => {
			this.errorsList[prop] = this.validator.handle(event.target.value, prop);
			this.validateForm();
		}
	}
	
	private validateForm() {
		for (let prop of Object.keys(this.values)) {
			this.invalid = !!this.validator.handle(this.values[prop], prop);
			if (this.invalid) {
				break;
			}
		}
	}
}
