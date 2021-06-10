import React, { FC } from "react";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core";
import { TokenService } from "../../service/token/TokenService";
import { TokenFactory } from "../../service/token/TokenFactory";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		appBarShift: {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		menuButton: {
			marginRight: 36,
		},
		hide: {
			display: 'none',
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: 'nowrap'
		},
		drawerOpen: {
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerClose: {
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: 'hidden',
			width: theme.spacing(7) + 1,
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9) + 1,
			},
		},
		toolbar: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
		},
		listItem: {
			paddingLeft: 24
		},
		content: {
			position: 'relative',
			top: `60px`,
			height: `calc(100vh - 60px)`,
			flexGrow: 1
		},
	}),
);

export const Menu: FC = (prop) => {
	const classes = useStyles();
	const theme = useTheme();
	const history = useHistory();
	const [open, setOpen] = React.useState(false);
	const [hidden, setHidden] = React.useState(false);
	
	const Guard = (isLogged: boolean) => {
		if (isLogged) {
			if (window.location.pathname !== '/home') {
				history.push('/home');
			}
		} else {
			if (window.location.pathname !== '/signin') {
				history.push('/signin');
			}
		}
	}
	
	const tokenService = new TokenService();
	Guard(TokenFactory.hasToken());
	tokenService.getToken().subscribe(token => {
		Guard(!!token);
		
		if (!token !== hidden) {
			setHidden(!token);
		}
	});
	
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	
	const handleDrawerClose = () => {
		setOpen(false);
	};
	
	return (hidden ? (
			<section className={classes.content}>
				{prop.children}
			</section>
		) : (
      <div className={classes.root}>
        <CssBaseline/>
        <AppBar
	        position="fixed"
	        className={clsx(classes.appBar, {
		        [classes.appBarShift]: open,
	        })}
        >
	        <Toolbar>
		        <IconButton
			        color="inherit"
			        aria-label="open drawer"
			        onClick={handleDrawerOpen}
			        edge="start"
			        className={clsx(classes.menuButton, {
				        [classes.hide]: open,
			        })}>
			        <MenuIcon/>
		        </IconButton>
	        </Toolbar>
        </AppBar>
        <Drawer
	        variant="permanent"
	        className={clsx(classes.drawer, {
		        [classes.drawerOpen]: open,
		        [classes.drawerClose]: !open,
	        })}
	        classes={{
		        paper: clsx({
			        [classes.drawerOpen]: open,
			        [classes.drawerClose]: !open,
		        }),
	        }}
        >
	        <div className={classes.toolbar}>
		        <IconButton onClick={handleDrawerClose}>
			        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
		        </IconButton>
	        </div>
	        <Divider/>
	        <List>
		        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
			        <ListItem className={classes.listItem} button key={text}>
				        <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
				        <ListItemText primary={text}/>
			        </ListItem>
		        ))}
	        </List>
	        <Divider/>
	        <List>
		        <ListItem onClick={() => TokenFactory.logout()} className={classes.listItem} button key="Sair">
			        <ListItemIcon><ExitToAppIcon/></ListItemIcon>
			        <ListItemText secondary="Sair"/>
		        </ListItem>
	        </List>
        </Drawer>
        <section className={classes.content}>
	        {prop.children}
        </section>
      </div>
    )
	);
}
