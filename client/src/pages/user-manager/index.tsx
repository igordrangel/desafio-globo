import React, { FC, useEffect, useState } from "react";
import { DataTable, HeadCell } from "../../shared/components/datatable";
import { UserInterface } from "../../shared/service/user-manager/user.interface";
import "./styles.css";
import { Add } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { BehaviorSubject } from "rxjs";
import { DialogUser } from "./dialog-user";
import { Confirm } from "../../shared/components/confirm";
import { UserManagerService } from "../../shared/service/user-manager/UserManagerService";
import { useSnackbar, VariantType } from "notistack";
import { AxiosError } from "axios";

export const UserManager: FC = () => {
	const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
	const [users, setUsers] = useState<UserInterface[]>([]);
	const [userEdit, setUserEdit] = useState<UserInterface | null>(null);
	const [confirmOpen, setConfirmDialogOpen] = useState(false);
	const [dialogUserOpen, setDialogUserOpen] = useState(false);
	const {enqueueSnackbar} = useSnackbar();
	
	const clearSelection$ = new BehaviorSubject<boolean>(false);
	const headCells: HeadCell[] = [
		{id: 'email', numeric: false, disablePadding: true, label: 'E-mail (Duplo Clique para Editar)'},
		{id: 'perfil', numeric: false, disablePadding: true, label: 'Perfil'}
	];
	const handleSnackBar = (message: string, variant: VariantType) => enqueueSnackbar(message, {variant});
	
	const deleteSelected = async () => {
		const userManagerService = new UserManagerService();
		handleDialogDelete(false);
		for (let idUserSelected of selectedUsers) {
			await userManagerService.delete(idUserSelected)
			                        .then(response => handleSnackBar(response?.data.message, "success"))
			                        .catch((responseError: AxiosError) => handleSnackBar(responseError.response?.data.message, "error"));
		}
		userManagerService.getAll()
		                  .then(response => {
			                  setUsers(response.data);
			                  clearSelection$.next(true);
		                  });
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
	
	const saveUser = (user: UserInterface) => new Promise<void>((resolve, reject) => {
		const userManagerService = new UserManagerService();
		userManagerService.save(user, user.id)
		                  .then(response => {
			                  handleSnackBar(response?.data.message, "success");
			                  userManagerService.getAll().then(response => setUsers(response.data)).then(() => resolve());
		                  })
		                  .catch((responseError: AxiosError) => {
		                  	handleSnackBar(responseError.response?.data.message, "error");
			                  reject(responseError);
		                  });
	});
	
	useEffect(() => {
		const userManagerService = new UserManagerService();
		userManagerService.getAll().then(response => setUsers(response.data)).then();
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
