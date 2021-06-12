import React from 'react';
import { SigninPage } from "./pages/signin";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Menu } from "./shared/components/menu";
import { UserManager } from "./pages/user-manager";

function App() {
	return (
		<BrowserRouter>
			<Menu children={
				<Switch>
					<Route exact path="/signin">
						<SigninPage/>
					</Route>
					<Route exact path="/dashboard">
						<Dashboard/>
					</Route>
					<Route exact path="/user-manager">
						<UserManager/>
					</Route>
				</Switch>
			}/>
		</BrowserRouter>
	);
}

export default App;
