import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs'

const public_key = fs.readFileSync('public.pem');
export const authToken = (req: express.Request,res: express.Response,next: express.NextFunction):
 void => {
  try {
    const authorizationHeader: string = req.headers['authorization'];
    const token: string = authorizationHeader.split(' ')[1];
   jwt.verify(token,public_key ,{ algorithms: ['RS256'] });
    next();
    
  } catch (error) {
    res.status(401).send("access denied!");
  }
};