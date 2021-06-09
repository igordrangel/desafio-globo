import { ChangeEvent, Component } from "react";
import { Validator } from "./Validator";

type GenericObjectType = {[index: string]: any};
export abstract class FormGroup<FormDataType extends GenericObjectType, ErrorsType> extends Component<any, any>{
	private values: any = {};
	private errorsList: any = {};
	public invalid: boolean = false;
	
	protected constructor(
		props: any,
		initialState: FormDataType,
		private validator: Validator
	) {
		super(props);
		Object.keys(initialState).forEach(prop => {
			this.values[prop] = initialState[prop];
		});
		this.validateForm();
	}
	
	public handle(prop: keyof FormDataType) {
		return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			this.values[prop] = event.target.value;
			this.validate(prop)(event);
			this.setState(this);
		}
	}
	
	public errors(): ErrorsType {
		return this.errorsList;
	}
	
	public getRawValue(): FormDataType {
		return this.values;
	}
	
	private validate(prop: keyof FormDataType) {
		return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
