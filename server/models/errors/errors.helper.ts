import { Response } from "express";
import { NotFoundError } from "./not-found.error";
import { AlreadyExistError } from "./already-exist.error";
import { ResponseInterface } from "../../interfaces/response.interface";

export const errorInesperado = {error: true, message: "Ocorreu um erro inesperado na aplicação."};

export class ErrorsHelper {
	public static sendError(res: Response, e: Error) {
		let errorMessage = {
			error: true,
			message: e.message
		} as ResponseInterface;
		
		if (e instanceof NotFoundError) {
			res.status(404).send(errorMessage);
		} else if (e instanceof AlreadyExistError) {
			res.status(422).send(errorMessage);
		} else if (e instanceof TypeError) {
			res.status(400).send(errorMessage);
		} else {
			res.status(500).send(errorMessage ?? errorInesperado);
		}
	}
}
