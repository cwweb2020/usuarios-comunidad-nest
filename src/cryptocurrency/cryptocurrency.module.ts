import { Module } from '@nestjs/common';
import { CryptocurrencyService } from './cryptocurrency.service';
import { CryptocurrencyController } from './cryptocurrency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cryptocurrency } from './entities/cryptocurrency.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CryptocurrencyController],
  providers: [CryptocurrencyService],
  imports: [TypeOrmModule.forFeature([Cryptocurrency]), AuthModule],
})
export class CryptocurrencyModule {}
