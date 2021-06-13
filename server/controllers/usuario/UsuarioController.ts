import { Express, Request, Response } from "express";
import { Authorization } from "../../middleware/authorization";
import { BaseController } from "../BaseController";
import { ResponseInterface } from "../../interfaces/response.interface";
import { UsuarioRepository } from "../../models/repository/UsuarioRepository";
import { Usuario } from "../../models/entity/usuario/Usuario";

module.exports = (app: Express) => {
	app.post('/user', Authorization.verify, async (req: Request, res: Response) => await BaseController.control(req, res, async (req, res) => {
		await (new UsuarioRepository()).save(req.body as Usuario);
		res.status(201).send({
			error: false,
			message: 'Usuário adicionado com sucesso!'
		} as ResponseInterface);
	}));
	
	app.put('/user/:id', Authorization.verify, async (req: Request, res: Response) => await BaseController.control(req, res,  async (req: Request, res: Response) => {
		await (new UsuarioRepository()).save(req.body as Usuario, parseInt(req.params.id));
		res.status(200).send({
			error: false,
			message: 'Usuário atualizado com sucesso!'
		} as ResponseInterface);
	}));
	
	app.get('/user', Authorization.verify, async (req: Request, res: Response) => await BaseController.control(req, res, async (req: Request, res: Response) => {
		res.status(200).send(await (new UsuarioRepository()).getAll());
	}));
	
	app.get('/user/:id', Authorization.verify, async (req: Request, res: Response) => await BaseController.control(req, res,  async (req: Request, res: Response) => {
		res.status(200).send(await (new UsuarioRepository()).getById(parseInt(req.params.id)));
	}));
	
	app.delete('/user/:id', Authorization.verify, async (req: Request, res: Response) => await BaseController.control(req, res,  async (req: Request, res: Response) => {
		await (new UsuarioRepository()).delete(parseInt(req.params.id));
		res.status(200).send({
			error: false,
			message: 'Usuário removido com sucesso!'
		} as ResponseInterface);
	}));
}
