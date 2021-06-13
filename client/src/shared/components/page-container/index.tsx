import React, { FC } from 'react';
import { SnackbarProvider } from "notistack";

export const PageContainer: FC = (props) => {
	return (
		<SnackbarProvider anchorOrigin={{vertical: "top", horizontal: "right"}} maxSnack={3}>
			{props.children}
		</SnackbarProvider>
	);
}
