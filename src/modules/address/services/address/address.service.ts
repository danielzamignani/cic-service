import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SearchAddressResponseDTO } from '../../dtos/search-address-response';
import { AddressDTO } from '../../dtos/address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from 'src/entities/address.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

@Injectable()
export class AddressService {
  @InjectRepository(AddressEntity)
  private readonly addressEntityRepository: Repository<AddressEntity>;

  constructor() {}

  async searchAddressZipCode(
    zipCode: string,
  ): Promise<SearchAddressResponseDTO> {
    const res = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
    const address = res.data;

    return {
      street: address.logradouro,
      city: `${address.localidade} - ${address.uf}`,
      zipCode: zipCode,
    };
  }

  async createAddress(addressDTO: AddressDTO): Promise<string> {
    const [city, uf] = addressDTO.city.split(/ - (?=[^-]*$)/);

    const address = new AddressEntity();
    address.id = randomUUID();
    address.city = city;
    address.uf = uf;
    address.street = addressDTO.street;
    address.number = addressDTO.number;
    address.complement = addressDTO.complement;
    address.zipCode = addressDTO.zipCode;

    await this.addressEntityRepository.insert(address);

    return address.id;
  }
}
