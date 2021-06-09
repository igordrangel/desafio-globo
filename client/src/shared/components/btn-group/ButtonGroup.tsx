import React, { FC, PropsWithChildren } from 'react';
import "./styles.css";

type ButtonGroupDirectionType = 'right' | 'left' | 'center';

interface ButtonGroupPropsInterface {
	direction: ButtonGroupDirectionType;
}

export const ButtonGroup: FC<ButtonGroupPropsInterface> = (props: PropsWithChildren<ButtonGroupPropsInterface>) => {
	return (
		<div className={`btn-group ${props.direction}`}>
			{props.children}
		</div>
	);
}
