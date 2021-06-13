import { Express } from "express";
import * as fs from "fs";
import * as path from "path";
import { UsuarioRepository } from "./models/repository/UsuarioRepository";
import { Usuario } from "./models/entity/usuario/Usuario";

export const rootPathApp = __dirname;

const apiExpress = require("./config/api-express");
const api: Express = apiExpress();

api.listen(9000, async () => {
	if (!fs.existsSync(path.join(rootPathApp, './mockup'))) {
		fs.mkdirSync(path.join(rootPathApp, './mockup'));
	}
	
	for (const user of ([
		{email: "usuariocomum@teste.com.br", perfil: "FUNCTIONARIO", password: "123"},
		{email: "usuarioadm@teste.com.br", perfil: "ADMINITRADOR", password: "123"}
	] as Usuario[]).values()) {
		await (new UsuarioRepository()).save(user).catch(e => null);
	}
	
	console.log('Servidor Iniciado!');
});

console.log("Servidor iniciado na porta 9000.");
