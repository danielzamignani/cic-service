import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { PaymentMethodEnum } from 'src/shared/constants/payment-method';

export class FinishPaymentRequestDTO {
  @ApiProperty({
    name: 'cardHolderName',
    description: 'Cardholder name',
    example: 'Daniel Zamignani',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  cardHolderName: string;

  @ApiProperty({
    name: 'cardHolderDocument',
    description: 'Cardholder document',
    example: '11111111111',
    required: true,
  })
  @IsNumberString()
  @IsNotEmpty()
  cardHolderDocument: string;

  @ApiProperty({
    name: 'cardNumber',
    description: 'Card number',
    example: '11111111111',
    required: true,
  })
  @IsNumberString()
  @IsNotEmpty()
  cardNumber: string;

  @ApiProperty({
    name: 'expirationDate',
    description: 'Expiration Date',
    example: '12/2024',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  expirationDate: string;

  @ApiProperty({
    name: 'cvv',
    description: 'CVV card',
    example: '123',
    required: true,
  })
  @IsNumberString()
  @IsNotEmpty()
  cvv: string;

  @ApiProperty({
    name: 'paymentMethod',
    description: 'Payment method',
    example: PaymentMethodEnum.CREDIT,
    required: true,
  })
  @IsEnum(PaymentMethodEnum)
  @IsNotEmpty()
  paymentMethod: PaymentMethodEnum;
}
