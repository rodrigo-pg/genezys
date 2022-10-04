import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {

    constructor(
        @Inject('AUTH_MICROSERVICE') private readonly client: ClientProxy
    ) {}

    async login(userId: string) {
        return this.client.send({role: "auth", cmd: "login"}, userId);
    }
}
