import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { TokenMiddleware } from 'src/middlewares/token.middleware';
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "WALLET_MICROSERVICE", 
        transport: Transport.TCP,
        options: {
          host: "wallet",
          port: 3005
        }
      }
    ]),
    ConfigModule.forRoot(),
    JwtModule,
    HttpModule
  ],
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes(WalletController);
  }
}