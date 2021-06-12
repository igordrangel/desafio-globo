import React, { ChangeEvent, FC } from "react";
import {
	Checkbox,
	createStyles,
	lighten,
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Theme,
	Tooltip,
	Typography
} from "@material-ui/core";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

const useToolbarStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(1),
		},
		highlight:
			theme.palette.type === 'light'
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85),
				}
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark,
				},
		title: {
			flex: '1 1 100%',
		},
	}),
);

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
		},
		paper: {
			width: '100%',
			marginBottom: theme.spacing(2),
		},
		table: {
			minWidth: 750,
		},
		visuallyHidden: {
			border: 0,
			clip: 'rect(0 0 0 0)',
			height: 1,
			margin: -1,
			overflow: 'hidden',
			padding: 0,
			position: 'absolute',
			top: 20,
			width: 1,
		},
	}),
);

type Order = 'asc' | 'desc';

export interface HeadCell {
	disablePadding: boolean;
	id: string;
	label: string;
	numeric: boolean;
}

interface EnhancedTableProps<DataType> {
	headCells: HeadCell[],
	classes: ReturnType<typeof useStyles>;
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DataType) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

interface EnhancedTableToolbarProps {
	title: string;
	deleteSelected: (selected: string[]) => void;
	selected: string[];
}

interface DatatablePropsInterface {
	title: string;
	headCells: HeadCell[];
	order?: Order;
	sort?: string;
	datasource: any[];
	setItemLine: (indexName: string, itemLine: any) => string | undefined;
	deleteSelected: (selected: string[]) => void;
	editItemLine: (itemLine: any) => void;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
	return order === 'desc'
	       ? (a, b) => descendingComparator(a, b, orderBy)
	       : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const EnhancedTableHead = (props: EnhancedTableProps<any>) => {
	const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
	const createSortHandler = (property: keyof any) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property);
	};
	
	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{'aria-label': 'select all desserts'}}
					/>
				</TableCell>
				{props.headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.id ? order : false}>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
	const classes = useToolbarStyles();
	
	const handleDelete = () => {
		props.deleteSelected(props.selected)
	}
	
	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: props.selected.length > 0,
			})}
		>
			{props.selected.length > 0 ? (
				<Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
					{props.selected.length} selected
				</Typography>
			) : (
				 <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
					 {props.title}
				 </Typography>
			 )}
			{props.selected.length > 0 ? (
				<Tooltip title="Delete">
					<IconButton onClick={handleDelete} aria-label="delete">
						<DeleteIcon/>
					</IconButton>
				</Tooltip>
			) : null}
		</Toolbar>
	);
};

export const DataTable: FC<DatatablePropsInterface> = (props) => {
	const classes = useStyles();
	const [order, setOrder] = React.useState<Order>(props.order ?? 'asc');
	const [orderBy, setOrderBy] = React.useState(props.sort ?? '');
	const [selected, setSelected] = React.useState<string[]>([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	
	const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};
	
	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setSelected(props.datasource.map((n) => n.id.toString()));
			return;
		}
		setSelected([]);
	};
	
	const handleClick = (event: ChangeEvent<HTMLInputElement>, id: string) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: string[] = [];
		
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}
		
		setSelected(newSelected);
	};
	
	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};
	
	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	
	const isSelected = (id: string) => selected.indexOf(id) !== -1;
	
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.datasource.length - page * rowsPerPage);
	
	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar title={props.title} selected={selected} deleteSelected={props.deleteSelected}/>
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size="medium"
						aria-label="enhanced table">
						<EnhancedTableHead
							headCells={props.headCells}
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={props.datasource.length}
						/>
						<TableBody>
							{stableSort(props.datasource, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.id.toString());
									const labelId = `enhanced-table-checkbox-${index}`;
									
									return (
										<TableRow
											hover
											onDoubleClick={() => props.editItemLine(row)}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.id}
											selected={isItemSelected}>
											<TableCell padding="checkbox">
												<Checkbox
													checked={isItemSelected}
													onChange={(event) => handleClick(event, row.id.toString())}
													inputProps={{'aria-labelledby': labelId}}
												/>
											</TableCell>
											{Object.keys(row).map(indexName => {
												const itemText = props.setItemLine(indexName, row);
												return itemText ? (
													<TableCell key={indexName} scope="row" padding="none">{itemText}</TableCell>) : null;
											})}
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{height: 53 * emptyRows}}>
									<TableCell colSpan={6}/>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={props.datasource.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
}
