import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class TokenMiddleware implements NestMiddleware {

    constructor(private readonly jwtServ: JwtService) {}

    use(req: Request, res: Response, next: Function) {
        const token = req.headers['authorization'];

        if (!token) return next(new UnauthorizedException('Token invalid!'));

        const cleanToken = token.replace('Bearer','').trim();

        //console.log(this.jwtServ.sign("signed", {secret: process.env.TOKEN_SECRET}))

        try {
            this.jwtServ.verify(cleanToken, {secret: process.env.TOKEN_SECRET});
            return next(); 
        } catch (error) {
            return next(new UnauthorizedException('Token invalid!'));
        }
    }
}