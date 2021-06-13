import { VariantType } from "notistack";

export type HandleSnackBarType = (message: string, variant: VariantType) => void;

export interface PageDefaultPropsInterface {
	handleSnackBar: HandleSnackBarType;
}
