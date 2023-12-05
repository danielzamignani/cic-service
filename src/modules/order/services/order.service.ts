import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderRequestDTO } from '../dtos/create-order-request.dto';
import { OrderEntity } from 'src/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ICurrentUser } from 'src/shared/interfaces/current-user.interface';
import { OrderStatusEnum } from 'src/shared/constants/order_status';
import { randomUUID } from 'crypto';
import { CartItemDTO } from '../dtos/cart-item.dto';
import { ItemOrderEntity } from 'src/entities/item-order.entity';
import { AddressService } from 'src/modules/address/services/address/address.service';
import { CreateOrderResponseDTO } from '../dtos/create-order-response.dto';
import { FinishPaymentRequestDTO } from '../dtos/finish-payment-request.dto';
import { PaymentEntity } from 'src/entities/payment.entity';

@Injectable()
export class OrderService {
  @InjectRepository(UserEntity)
  private readonly userEntityRepository: Repository<UserEntity>;

  @InjectRepository(OrderEntity)
  private readonly orderEntityRepository: Repository<OrderEntity>;

  @InjectRepository(ItemOrderEntity)
  private readonly itemOrderEntityRepository: Repository<ItemOrderEntity>;

  @InjectRepository(PaymentEntity)
  private readonly paymentEntityRepository: Repository<PaymentEntity>;

  constructor(private addressService: AddressService) {}

  async createOrder(
    createOrderRequestDTO: CreateOrderRequestDTO,
    currentUser: ICurrentUser,
  ): Promise<CreateOrderResponseDTO> {
    const user = await this.userEntityRepository.findOne({
      where: {
        id: currentUser.sub,
      },
    });

    if (!user) throw new NotFoundException(`User not found!`);

    const addressId = await this.addressService.createAddress(
      createOrderRequestDTO.address,
    );

    const order = new OrderEntity();
    order.id = randomUUID();
    order.orderName = createOrderRequestDTO.name;
    order.totalPrice = createOrderRequestDTO.totalPrice;
    order.user = user;
    order.addressId = addressId;
    order.status = OrderStatusEnum.NEW;
    order.createdAt = new Date().toISOString();
    order.updatedAt = order.createdAt;

    await this.orderEntityRepository.insert(order);

    await this.createItemOrderRelation(createOrderRequestDTO.items, order);

    return {
      orderId: order.id,
      message: 'Success!',
    };
  }

  private async createItemOrderRelation(
    items: CartItemDTO[],
    order: OrderEntity,
  ): Promise<void> {
    const itemsOrder: ItemOrderEntity[] = items.map((item) => {
      const itemOrder = new ItemOrderEntity();
      itemOrder.itemId = item.item.id;
      itemOrder.quantity = item.quantity;
      itemOrder.orderId = order.id;

      return itemOrder;
    });

    await this.itemOrderEntityRepository.insert(itemsOrder);

    return;
  }

  async getOrderById(orderId: string, currentUser: ICurrentUser): Promise<any> {
    const order = await this.orderEntityRepository.findOne({
      where: {
        id: orderId,
      },
      relations: ['address', 'user', 'itemsOrders', 'itemsOrders.item'],
    });

    if (order.userId !== currentUser.sub)
      throw new UnauthorizedException(`This order is not of this user!`);

    const res = {
      ...order,
      items: order.itemsOrders,
    };

    return res;
  }

  async finishPayment(
    orderId: string,
    finishPaymentRequestDTO: FinishPaymentRequestDTO,
    currentUser: ICurrentUser,
  ): Promise<any> {
    const order = await this.orderEntityRepository.findOne({
      where: { id: orderId },
    });

    if (!order) throw new NotFoundException(`Order not found!`);

    if (order.userId !== currentUser.sub)
      throw new UnauthorizedException(`This order is not of this user!`);

    if(order.status !== OrderStatusEnum.NEW)
      throw new UnprocessableEntityException(`This order payment already processed!`)

    const payment = new PaymentEntity();
    payment.id = randomUUID();
    payment.cardHolderDocument = finishPaymentRequestDTO.cardHolderDocument;
    payment.cardHolderName = finishPaymentRequestDTO.cardHolderName;
    payment.cardNumber = finishPaymentRequestDTO.cardNumber;
    payment.expirationDate = finishPaymentRequestDTO.expirationDate;
    payment.paymentMethod = finishPaymentRequestDTO.paymentMethod;
    payment.orderId = order.id;

    await this.paymentEntityRepository.insert(payment);

    order.updatedAt = new Date().toISOString();
    order.status = OrderStatusEnum.PAYED;
    await this.orderEntityRepository.save(order);

    return;
  }
}
