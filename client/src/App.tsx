import React from 'react';
import { SigninPage } from "./pages/signin";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/home";
import { Menu } from "./shared/components/menu";

function App() {
	return (
		<BrowserRouter>
			<Menu children={
				<Switch>
					<Route exact path="/signin">
						<SigninPage/>
					</Route>
					<Route exact path="/home">
						<Home/>
					</Route>
				</Switch>
			}/>
		</BrowserRouter>
	);
}

export default App;
