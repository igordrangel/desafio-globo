export interface ValidatorErrorInterface {
	error: boolean;
	errorMessage: string;
}

export interface ValidatorInterface {
	validator: ValidatorsType;
	errorMessage: string;
}

type ValidatorsType = "required" | "email";

export class Validator {
	
	constructor(
		private validators: {
			[index: string]: ValidatorInterface[]
		}
	) {}
	
	public handle(value: any, propName: any) {
		return this.validate(value, this.validators[propName]);
	}
	
	private validate(value: any, validators: ValidatorInterface[]) {
		let error: ValidatorErrorInterface | null = null;
		
		if (validators) {
			for (let validator of validators.values()) {
				if (!error) {
					error = (this.verifyError(value, validator.validator) ? {
						error: true,
						errorMessage: validator.errorMessage
					} : null);
				} else {
					break;
				}
			}
		}
		
		return error;
	}
	
	private verifyError(value: any, type: ValidatorsType) {
		switch (type) {
			case "required":
				return this.required(value);
			case "email":
				return this.email(value);
			default:
				return false;
		}
	}
	
	private required(value: any) {
		return !value;
	}
	
	private email(value: string) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return !re.test(String(value).toLowerCase());
	}
}
