import { NotFoundError } from "../errors/not-found.error";
import * as fs from "fs";
import * as path from "path";
import { koala } from "koala-utils";
import { rootPathApp } from "../../index";

export abstract class RepositoryBase<DataType> {
	
	protected constructor(private mockupName: string) {
	}
	
	public async getAll() {
		return this.getAllOnMockup();
	}
	
	public async getOne(filter: { [FilterType in keyof DataType]? :DataType[FilterType] }) {
		return (await this.getAll()).find((item: any) => {
			return Object.keys(filter)
			      .map(itemIndexName => item[itemIndexName] === (filter as any)[itemIndexName])
			      .indexOf(false) < 0
		})
	}
	
	public async getById(id: number) {
		try {
			const item = await this.getByIdOnMockup(id);
			if (item) {
				return item;
			} else {
				return new NotFoundError("Registro inválido ou inexistente.");
			}
		} catch (e) {
			throw e;
		}
	}
	
	public async save(data: DataType, id?: number, validateAsync?: (data: DataType) => Promise<boolean>) {
		return new Promise<DataType>((async (resolve, reject) => {
			try {
				const persistData = data as any;
				
				this.validate(validateAsync)(data)
				    .then(async isValid => {
				    	if (isValid) {
						    persistData.id = id ?? await this.getNextId();
						    await this.saveOnMockup(persistData);
						    resolve(persistData);
					    } else {
				    		reject(new Error("Ocorreu um erro inesperado ao tentar salvar os dados."));
					    }
				    }).catch(reject);
				
			} catch (e) {
				reject(e);
			}
		}));
	}
	
	public async delete(id: number) {
		try {
			if ((await this.getByIdOnMockup(id))) {
				await this.deleteOnMockup(id);
			} else {
				return new NotFoundError("Não foi possível excluir o item solicitado. Registro inexistente ou já removido.");
			}
		} catch (e) {
			throw e;
		}
	}
	
	protected validate(validateAsync?: (data: DataType) => Promise<boolean>) {
		return validateAsync ?? (() => new Promise<boolean>(resolve => resolve(true)));
	};
	
	private async getAllOnMockup() {
		return JSON.parse(fs.readFileSync(this.getMockupFilePath()).toString()) as DataType[];
	}
	
	private async saveOnMockup(data: DataType) {
		const list = await this.getAllOnMockup();
		const currentIndex = koala(list).array<DataType>().getIndex('id', (data as any).id);
		if (currentIndex !== -1) {
			list[currentIndex] = data;
		} else {
			list.push(data);
		}
		fs.writeFileSync(this.getMockupFilePath(), JSON.stringify(list));
	}
	
	private async getByIdOnMockup(id: number) {
		const result = (await this.getAllOnMockup()).find((item: any) => item.id === id);
		if (result) {
			return result;
		} else {
			throw new NotFoundError("Usuário inválido ou inexistente!");
		}
	}
	
	private async deleteOnMockup(id: number) {
		const list = await this.getAllOnMockup();
		const indexDelete = koala(list).array<DataType>().getIndex('id', id);
		if (indexDelete !== -1) {
			list.splice(indexDelete, 1);
			fs.writeFileSync(this.getMockupFilePath(), JSON.stringify(list));
		}
	}
	
	private async getNextId() {
		let lastId = 0;
		(await this.getAll()).forEach((item: any) => {
			if (item.id > lastId) {
				lastId = item.id;
			}
		});
		
		return lastId + 1;
	}
	
	private getMockupFilePath() {
		const filePath = path.join(rootPathApp, "mockup", this.mockupName + ".json");
		if (!fs.existsSync(filePath)) {
			fs.writeFileSync(filePath, JSON.stringify([]));
		}
		
		return filePath;
	}
}

