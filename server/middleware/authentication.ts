import { Express, Request, Response } from "express";
import { check } from "express-validator";
import { BaseController } from "../controllers/BaseController";
import { AuthenticationInterface } from "../interfaces/authentication.interface";
import { UsuarioRepository } from "../models/repository/UsuarioRepository";

module.exports = (app: Express) => {
	app.post('/auth', [
		check('email')
			.notEmpty().withMessage("email não informado."),
		check('password')
			.notEmpty().withMessage("password não informada."),
	], async (req: Request, res: Response) => await BaseController.control(req, res, async (req: Request, res: Response) => {
		const token = await (new UsuarioRepository()).autenticar(req.body as AuthenticationInterface);
		
		if (token) {
			res.status(200).send(token);
		} else {
			throw new TypeError("Login ou Senha inválidos");
		}
	}));
};
