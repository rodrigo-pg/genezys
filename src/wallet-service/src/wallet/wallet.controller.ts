import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateWalletRequest } from './dtos/create-wallet-request.dto';
import { WalletService } from './wallet.service';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @MessagePattern({role: "wallet", cmd: "get-wallet-balance"})
  async getWalletBalance(id: string) {
    return await this.walletService.getWalletBalance(id);
  }

  @MessagePattern({role: "wallet", cmd: "create"})
  async createWallet(createWalletRequest: CreateWalletRequest) {
    return await this.walletService.createWallet(createWalletRequest);
  }
}
