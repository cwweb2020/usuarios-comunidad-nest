import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from 'orm.config';
import { CryptocurrencyModule } from './cryptocurrency/cryptocurrency.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(ormConfig()), CryptocurrencyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
