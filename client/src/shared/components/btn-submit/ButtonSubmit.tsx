import React, { FC } from "react";
import clsx from "clsx";
import { Button, CircularProgress, createStyles, makeStyles, Theme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			alignItems: 'center',
		},
		wrapper: {
			margin: theme.spacing(1),
			position: 'relative',
		},
		buttonSuccess: {
			backgroundColor: green[500],
			'&:hover': {
				backgroundColor: green[700],
			},
		},
		buttonProgress: {
			position: 'absolute',
			top: '50%',
			left: '50%',
			marginTop: -12,
			marginLeft: -12,
		},
	}),
);

interface ButtonSubmitPropsInterface {
	btnLabel: string;
	success?: boolean;
	loading?: boolean;
	disabled?: boolean;
}

export const ButtonSubmit: FC<ButtonSubmitPropsInterface> = (props) => {
	const classes = useStyles();
	
	const buttonClassname = clsx({
		[classes.buttonSuccess]: props.success ?? false,
	});
	
	return (
		<div className={classes.root}>
			<div className={classes.wrapper}>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					className={buttonClassname}
					disabled={props.loading || props.disabled}>
					{props.btnLabel}
				</Button>
				{props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
			</div>
		</div>
	);
}
