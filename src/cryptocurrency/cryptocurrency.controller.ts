import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { CryptocurrencyService } from './cryptocurrency.service';
import { CreateCryptocurrencyDto } from './dto/create-cryptocurrency.dto';
import { UpdateCryptocurrencyDto } from './dto/update-cryptocurrency.dto';
import { BuyMoreDto } from './dto/BuyMore.dto';
import { Cryptocurrency } from './entities/cryptocurrency.entity';

@Controller('crypto')
export class CryptocurrencyController {
  constructor(private readonly cryptocurrencyService: CryptocurrencyService) {}

  @Post()
  create(@Body() createCryptocurrencyDto: CreateCryptocurrencyDto) {
    return this.cryptocurrencyService.create(createCryptocurrencyDto);
  }

  @Get()
  findAll() {
    return this.cryptocurrencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cryptocurrencyService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCryptocurrencyDto: UpdateCryptocurrencyDto,
  ) {
    return this.cryptocurrencyService.update(id, updateCryptocurrencyDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.cryptocurrencyService.remove(id);
  }

  @Post('buy-more')
  async buyMore(@Body() buyMoreDto: BuyMoreDto): Promise<Cryptocurrency> {
    return await this.cryptocurrencyService.updateQuantity(
      buyMoreDto.ticker,
      buyMoreDto.amount,
    );
  }
}
