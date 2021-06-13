import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const TOKEN_SECRET = '27FV6xG9qrxR@Xwhd3WVnBEmn@TKAV7*qH#PGUu2d^wcmT-xp=hV4HXX4Zs#DscZ5tcWhF$BDCZJj&J_ns%e_9WGUU93zfXx&=7kpTt@ecnVt4G@e4GKYJe@saG#zge%wWbBVc=JaRe=M#ZS?AVzBXY6u44vpEyc@7FZDCk^$&5N^5wX@c+YYE!6vt-FAZ2KBwzdhq-c=W2*TmpHyuGzeP6e$v*gPzYu^qJ^=GV&rMe&2U4qrCNSwE-PqxNwyunS';

export class Authorization {
	public static verify(req: Request, res: Response, next: NextFunction) {
		if (req.headers['authorization']) {
			const token = req.headers['authorization'].replace(/Bearer /g, '');
			if (!token) return res.status(401).send({auth: false, message: 'Token não informado.'});
			
			jwt.verify(token, TOKEN_SECRET, function (err: any, decoded: any) {
				if (err) return res.status(500).send({auth: false, message: 'Token inválido ou vencido.'});
				req.cookies = {
					userId: decoded.id
				};
				next();
			});
		} else {
			return res.status(401).send({auth: false, message: 'Token não informado.'});
		}
	}
}
