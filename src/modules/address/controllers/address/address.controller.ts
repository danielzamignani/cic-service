import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddressService } from '../../services/address/address.service';
import { SearchAddressResponseDTO } from '../../dtos/search-address-response';

@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @ApiResponse({
    status: 200,
    type: SearchAddressResponseDTO,
    description: 'Return address by zip code',
  })
  @Get('/:zipCode')
  async searchAddressZipCode(
    @Param('zipCode') zipCode: string,
  ): Promise<SearchAddressResponseDTO> {
    return this.addressService.searchAddressZipCode(zipCode);
  }
}
