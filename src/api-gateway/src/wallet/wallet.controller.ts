import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreateWalletRequest } from './dtos/create-wallet-request.dto';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly httpService: HttpService,
  ) {}

  @Get("/get-wallet-balance/:id")
  async getWalletBalance(@Param("id") id: string) {
    return await this.walletService.getWalletBalance(id);
  }

  @Post("/create-wallet")
  async createWallet(@Body() createWalletRequest: CreateWalletRequest) {
    const address = await lastValueFrom(await this.walletService.createWallet(createWalletRequest));
    const callbackData = { 
      walletAddress: address.walletAddress,
      userId: createWalletRequest.userId
    }

    this
    .httpService
    .post(createWalletRequest.webhook, callbackData)
    .subscribe()

    return address;
  }
}
