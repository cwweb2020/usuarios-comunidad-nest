import { Module } from '@nestjs/common';
import { CryptocurrencyService } from './cryptocurrency.service';
import { CryptocurrencyController } from './cryptocurrency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cryptocurrency } from './entities/cryptocurrency.entity';

@Module({
  controllers: [CryptocurrencyController],
  providers: [CryptocurrencyService],
  imports: [TypeOrmModule.forFeature([Cryptocurrency])],
})
export class CryptocurrencyModule {}
