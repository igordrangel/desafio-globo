import React, { FC } from "react";
import "./styles.css";

export const AppContent: FC = (prop) => {
	return (
		<main className='app-container'>
			{prop.children}
		</main>
	);
}
