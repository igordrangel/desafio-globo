import React from 'react';
import { SigninPage } from "./pages/signin";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Menu } from "./shared/components/menu";
import { UserManager } from "./pages/user-manager";
import { PageContainer } from "./shared/components/page-container";

function App() {
	
	return (
		<BrowserRouter>
			<Menu children={
				<Switch>
					<Route exact path="/signin">
						<PageContainer children={(<SigninPage/>)}/>
					</Route>
					<Route exact path="/dashboard">
						<Dashboard/>
					</Route>
					<Route exact path="/user-manager">
						<PageContainer children={(<UserManager/>)}/>
					</Route>
				</Switch>
			}/>
		</BrowserRouter>
	);
}

export default App;
