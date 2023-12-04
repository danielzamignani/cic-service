import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SearchAddressResponseDTO } from '../../dtos/search-address-response';

@Injectable()
export class AddressService {
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
}
