import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './schemas/wallet.schema';
import { ConfigModule } from '@nestjs/config';
import Web3 from "web3";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Wallet.name, schema: WalletSchema}]),
    MongooseModule.forRoot("mongodb://mongodb/wallets"),
    ConfigModule.forRoot()
  ],
  controllers: [WalletController],
  providers: [
    WalletService,
    {
      provide: Web3,
      useFactory: async () => {
        return new Web3(process.env.ALCHEMY_GATEWAY);
      }
    }
  ]
})
export class WalletModule {}