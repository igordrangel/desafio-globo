import React, { FC, useEffect, useState } from "react";
import { DataTable, HeadCell } from "../../shared/components/datatable";
import { UserInterface } from "../../shared/service/user-manager/user.interface";
import "./styles.css";
import { Add } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

export const UserManager: FC = () => {
	const [users, setUsers] = useState<UserInterface[]>([]);
	const headCells: HeadCell[] = [
		{id: 'email', numeric: false, disablePadding: true, label: 'E-mail'},
		{id: 'perfil', numeric: false, disablePadding: true, label: 'Perfil'}
	];
	
	const handleDelete = (selected: string[]) => {
		console.log(selected);
	}
	
	const handleEdit = (user: UserInterface) => {
		console.log(user);
	}
	
	useEffect(() => {
		setTimeout(() => {
			setUsers([
				{id: 1, email: 'usuariocomum@teste.com.br', perfil: 'FUNCIONARIO'},
				{id: 2, email: 'usarioadm@teste.com.br', perfil: 'ADMINISTRADOR'}
			]);
		}, 2000);
	}, [setUsers])
	
	return (
		<section className="content">
			<nav>
				<IconButton className="btn-add" size="small" aria-label="add">
					<Add />
				</IconButton>
			</nav>
			<div className="list">
				<DataTable
					title="Gerenciamento de Usuários"
					headCells={headCells}
					datasource={users}
					deleteSelected={handleDelete}
					editItemLine={handleEdit}
					setItemLine={(indexName, user: UserInterface) => {
						switch (indexName) {
							case 'email':
								return user.email;
							case 'perfil':
								return user.perfil;
						}
					}}/>
			</div>
		</section>
	);
}
