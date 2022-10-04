import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
      },
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.TCP,
        options: { 
          host: "auth",
          port: 3001 
        }
      },
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
