import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { ClientConfigModule } from '../client-config/client-config.module';
import { USERS_CLIENT } from './constants';
import { ClientConfigService } from '../client-config/client-config.service';

@Module({
  imports:[ClientConfigModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USERS_CLIENT,
      useFactory: (configService: ClientConfigService) => {
        const clientOptions = configService.usersClientOption;
        return ClientProxyFactory.create(clientOptions)
      },
      inject:[ClientConfigService]
  }
  ],
})
export class UsersModule {}
