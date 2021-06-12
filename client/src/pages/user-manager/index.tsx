import React, { FC, useEffect, useState } from "react";
import { DataTable, HeadCell } from "../../shared/components/datatable";
import { UserInterface } from "../../shared/service/user-manager/user.interface";
import "./styles.css";
import { Add } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { BehaviorSubject } from "rxjs";
import { DialogUser } from "../../shared/components/datatable/dialog-user";
import { Confirm } from "../../shared/components/confirm";

export const UserManager: FC = () => {
	const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
	const [users, setUsers] = useState<UserInterface[]>([]);
	const [userEdit, setUserEdit] = useState<UserInterface | null>(null);
	const [confirmOpen, setConfirmDialogOpen] = useState(false);
	const [dialogUserOpen, setDialogUserOpen] = useState(false);
	
	const clearSelection$ = new BehaviorSubject<boolean>(false);
	const headCells: HeadCell[] = [
		{id: 'email', numeric: false, disablePadding: true, label: 'E-mail'},
		{id: 'perfil', numeric: false, disablePadding: true, label: 'Perfil'}
	];
	
	const deleteSelected = () => {
		handleDialogDelete(false);
		const newListUsers: UserInterface[] = [];
		users?.forEach(user => {
			if (selectedUsers?.indexOf(user.id ?? -1) < 0) {
				newListUsers.push(user);
			}
		})
		setUsers(newListUsers);
		clearSelection$.next(true);
	}
	
	const handleDialogUser = (open: boolean) => {
		setDialogUserOpen(open);
	};
	
	const handleDialogDelete = (open: boolean) => {
		setConfirmDialogOpen(open);
	};
	
	const handleDelete = (selected: string[]) => {
		setSelectedUsers(selected.map(id => parseInt(id)));
		handleDialogDelete(true);
	}
	
	const handleEdit = (user: UserInterface) => {
		setUserEdit(user);
		handleDialogUser(true);
	}
	
	const saveUser = (user: UserInterface) => new Promise<void>(resolve => {
		resolve();
	});
	
	useEffect(() => {
		setTimeout(() => {
			setUsers([
				{id: 1, email: 'usuariocomum@teste.com.br', perfil: 'FUNCIONARIO', password: '123'},
				{id: 2, email: 'usarioadm@teste.com.br', perfil: 'ADMINISTRADOR', password: '123'}
			]);
		}, 2000);
	}, [setUsers])
	
	return (
		<section className="content">
			<DialogUser open={dialogUserOpen} handle={handleDialogUser} userEdit={userEdit} sendData={saveUser}/>
			<Confirm open={confirmOpen} handle={handleDialogDelete} confirm={deleteSelected}/>
			
			<nav>
				<IconButton onClick={() => {
					setUserEdit(null);
					handleDialogUser(true);
				}} className="btn-add" size="small" aria-label="add">
					<Add/>
				</IconButton>
			</nav>
			<div className="list">
				<DataTable
					title="Gerenciamento de Usuários"
					headCells={headCells}
					datasource={users}
					deleteSelected={handleDelete}
					editItemLine={handleEdit}
					clearSelection$={clearSelection$}
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
