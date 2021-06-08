import Login from "./components/login/Login";
import TokenService from "./shared/services/TokenService";
import Home from "./components/home/Home";
import Menu from "./shared/components/menu/Menu";

function App() {
  const tokenService = new TokenService();

  if (tokenService.isLogged()) {
    return (
        <main>
          <nav>
            <Menu/>
          </nav>
          <section>
            <Home/>
          </section>
        </main>
    );
  } else {
    return (<Login/>);
  }
}

export default App;
