import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCryptocurrencyDto } from './dto/create-cryptocurrency.dto';
import { UpdateCryptocurrencyDto } from './dto/update-cryptocurrency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cryptocurrency } from './entities/cryptocurrency.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CryptocurrencyService {
  constructor(
    @InjectRepository(Cryptocurrency)
    private cryptocurrencyRepository: Repository<Cryptocurrency>,
  ) {}

  async create(createCryptocurrencyDto: CreateCryptocurrencyDto) {
    try {
      const newProduct = this.cryptocurrencyRepository.create(
        createCryptocurrencyDto,
      );
      await this.cryptocurrencyRepository.save(newProduct);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return createCryptocurrencyDto;
  }

  async findAll() {
    return await this.cryptocurrencyRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} cryptocurrency`;
  }

  update(id: number, updateCryptocurrencyDto: UpdateCryptocurrencyDto) {
    return `This action updates a #${id} cryptocurrency`;
  }

  remove(id: number) {
    return `This action removes a #${id} cryptocurrency`;
  }

  //comprar mas criptomonedas
  // async updateQuantity(ticker: string, additionalAmount: number): Promise<Cryptocurrency> {
  //   const cryptocurrency = await this.cryptocurrencyRepository.findOne({ where: { ticker } });

  //   if (!cryptocurrency) {
  //     throw new NotFoundException(`Cryptocurrency with ticker ${ticker} not found`);
  //   }

  //   // Actualiza la cantidad comprada
  //   cryptocurrency.cantidadComprada += additionalAmount;

  //   // Recalcula la cantidad invertida
  //   cryptocurrency.cantidadInvertida = cryptocurrency.precioCompra * cryptocurrency.cantidadComprada;

  //   // Guarda los cambios
  //   await this.cryptocurrencyRepository.save(cryptocurrency);

  //   return cryptocurrency;
  // }
}
