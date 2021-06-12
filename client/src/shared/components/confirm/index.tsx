import React, { FC } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";

interface ConfirmPropsInterface {
	open: boolean;
	handle: (open: boolean) => void;
	confirm: () => void;
}

export const Confirm: FC<ConfirmPropsInterface> = (props) => {
	
	return (
		<Dialog
			open={props.open}
			onClose={() => props.handle(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description">
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Deseja mesmo excluir os itens selecionados?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => props.handle(false)} color="primary">
					Não
				</Button>
				<Button onClick={props.confirm} color="primary" autoFocus>
					Sim
				</Button>
			</DialogActions>
		</Dialog>
	);
}
