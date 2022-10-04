import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Web3 from "web3";
import { CreateWalletRequest } from './dtos/create-wallet-request.dto';
import { Wallet, WalletDocument } from './schemas/wallet.schema';

@Injectable()
export class WalletService {

    constructor(
      @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
      private web3Client: Web3
    ) {}

    async createWallet(createWalletRequest: CreateWalletRequest) {
      const account = await this.walletModel.findOne({userId: createWalletRequest.userId});
      if (account) return { status: "User already has a wallet"};
      const wallet = this.web3Client.eth.accounts.create();
      const walletData = {
        userId: createWalletRequest.userId,
        address: wallet.address,
        privateKey: wallet.privateKey
      }; 
      const dbEntry = new this.walletModel(walletData);
      await dbEntry.save();
      return {
        walletAddress: wallet.address
      };
    }
  
    async getWalletBalance(userId: string) {
      const account = await this.walletModel.findOne({userId});
      if (!account) return { status: "Wallet not found for this user"};
      const balance = await this.web3Client.eth.getBalance(account.address);
      const result = {
        walletAddress: account.address,
        balance
      }
      return result;
    }
}
