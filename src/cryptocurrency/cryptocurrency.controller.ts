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
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('crypto')
export class CryptocurrencyController {
  constructor(private readonly cryptocurrencyService: CryptocurrencyService) {}

  @Post()
  @Auth('admin')
  create(@Body() createCryptocurrencyDto: CreateCryptocurrencyDto) {
    return this.cryptocurrencyService.create(createCryptocurrencyDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.cryptocurrencyService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.cryptocurrencyService.findOne(id);
  }

  @Put(':id')
  @Auth('admin')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCryptocurrencyDto: UpdateCryptocurrencyDto,
  ) {
    return this.cryptocurrencyService.update(id, updateCryptocurrencyDto);
  }

  @Delete(':id')
  @Auth('admin')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.cryptocurrencyService.remove(id);
  }

  @Post('buy-more')
  @Auth()
  async buyMore(@Body() buyMoreDto: BuyMoreDto): Promise<Cryptocurrency> {
    return await this.cryptocurrencyService.updateQuantity(
      buyMoreDto.ticker,
      buyMoreDto.amount,
    );
  }
}
