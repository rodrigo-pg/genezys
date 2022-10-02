import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Web3 from "web3";
import { CreateWalletRequest } from './dtos/create-wallet-request.dto';
import { Wallet, WalletDocument } from './schemas/wallet.schema';

@Injectable()
export class WalletService {

    constructor(@InjectModel(Wallet.name) private walletModel: Model<WalletDocument>) {}

    async createWallet(createWalletRequest: CreateWalletRequest) {
      const web3 = new Web3(process.env.ALCHEMY_GATEWAY);
      const wallet = web3.eth.accounts.create();
      const walletData = {
        userId: createWalletRequest.userId,
        address: wallet.address,
        privateKey: wallet.privateKey
      }; 
      const dbEntry = new this.walletModel(walletData);
      await dbEntry.save();
      return wallet.address;
    }
  
    async getWalletBalance(userId: string) {
      const account = await this.walletModel.findOne({userId});
      if (!account) throw new NotFoundException("Wallet not found for this user");
      const web3 = new Web3(process.env.ALCHEMY_GATEWAY);
      const balance = await web3.eth.getBalance(account.address);
      const result = {
        walletAddress: account.address,
        balance
      }
      return result;
    }
}
