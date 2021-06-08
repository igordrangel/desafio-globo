import React, { Component } from "react";
import "./Login.css";
import TokenService from "../../shared/services/TokenService";

export default class Login extends Component {

    login(event) {
        event.preventDefault();
        event.stopPropagation();

        const login = document.querySelector("#formLogin input[name='login']").value;
        const senha = document.querySelector("#formLogin input[name='senha']").value;

        const tokenService = new TokenService();
        console.log(login, senha);
        tokenService.setToken("testeLogin");
    }

    render() {
        return (
            <section className="container">
                <form id="formLogin" onSubmit={this.login}>
                    <h1> Bem-Vindo!</h1>
                    <small>Informe abaixo seus dados de acesso</small>
                    <div className="field-container">
                        <label>Usuário*</label>
                        <input name="login" type="email" placeholder="Ex.: seunome@teste.com.br" required/>
                    </div>
                    <div className="field-container">
                        <label>Senha*</label>
                        <input name="senha" type="password" placeholder="Informe sua senha" required/>
                    </div>
                    <div className="btn-group right">
                        <button className="btn primary" type="submit">Entrar</button>
                    </div>
                </form>
            </section>
        );
    }
}
