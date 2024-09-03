import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCryptocurrencyDto } from './dto/create-cryptocurrency.dto';
import { UpdateCryptocurrencyDto } from './dto/update-cryptocurrency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cryptocurrency } from './entities/cryptocurrency.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

@Injectable()
export class CryptocurrencyService {
  constructor(
    @InjectRepository(Cryptocurrency)
    private cryptocurrencyRepository: Repository<Cryptocurrency>,
  ) {}

  // TODO create a new crypto
  async create(createCryptocurrencyDto: CreateCryptocurrencyDto) {
    try {
      const newCrypto = this.cryptocurrencyRepository.create(
        createCryptocurrencyDto,
      );
      await this.cryptocurrencyRepository.save(newCrypto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return createCryptocurrencyDto;
  }

  // TODO get all cryptos
  async findAll() {
    return await this.cryptocurrencyRepository.find();
  }

  // TODO  get a single crypto
  async findOne(id: string) {
    let crypto: Cryptocurrency;

    if (isUUID(id)) {
      crypto = await this.cryptocurrencyRepository.findOneBy({
        id,
      });
    } else {
      crypto = await this.cryptocurrencyRepository.findOneBy({
        ticker: id,
      });
    }

    if (!crypto)
      throw new NotFoundException(`Cryptocurrency with id ${id} not found`);

    return crypto;
  }

  // TODO update a crypto
  async update(id: string, updateCryptocurrencyDto: UpdateCryptocurrencyDto) {
    const crypto = await this.findOne(id);
    const newCrypto = Object.assign(crypto, updateCryptocurrencyDto);
    await this.cryptocurrencyRepository.save(newCrypto);

    return newCrypto;
  }

  // TODO remove a crypto
  async remove(id: string) {
    const crypto = await this.findOne(id);
    try {
      await this.cryptocurrencyRepository.delete(id);
    } catch (error) {
      this.handleErrors(error);
    }

    return { message: `Cryptocurrency with title ${crypto.nombre} deleted` };
  }

  //buy more crypto
  async updateQuantity(
    idOrTicker: string,
    additionalAmount: number,
  ): Promise<Cryptocurrency> {
    const crypto = await this.findOne(idOrTicker);

    crypto.cantidadComprada += additionalAmount;

    crypto.cantidadInvertida = crypto.precioCompra * crypto.cantidadComprada;

    await this.cryptocurrencyRepository.save(crypto);

    return crypto;
  }

  private handleErrors(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(`Porduct with ${error.detail} `);
    }
    throw new InternalServerErrorException();
  }
}
