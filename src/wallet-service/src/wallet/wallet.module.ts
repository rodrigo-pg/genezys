import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './schemas/wallet.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Wallet.name, schema: WalletSchema}]),
    MongooseModule.forRoot("mongodb://mongodb/wallets"),
    ConfigModule.forRoot()
  ],
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule {}
