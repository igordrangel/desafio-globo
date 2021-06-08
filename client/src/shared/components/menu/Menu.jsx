import {Component} from "react";
import TokenService from "../../services/TokenService";

export default class Menu extends Component {

    render() {
        const tokenService = new TokenService();
        return (
            <button onClick={tokenService.removeToken} type='button'>Sair</button>
        );
    }
}
