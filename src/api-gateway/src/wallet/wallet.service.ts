import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateWalletRequest } from './dtos/create-wallet-request.dto';

@Injectable()
export class WalletService {

    constructor(
        @Inject('WALLET_MICROSERVICE') private readonly client: ClientProxy
      ) {}
    
      async createWallet(createWalletRequest: CreateWalletRequest) {
        return this.client.send({role: "wallet", cmd: "create"}, createWalletRequest);
      }
    
      async getWalletBalance(userId: string) {
        return this.client.send({role: "wallet", cmd: "get-wallet-balance"}, userId);
      }
}
