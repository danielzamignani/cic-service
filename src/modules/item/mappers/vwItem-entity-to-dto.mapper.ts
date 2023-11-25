import { VwItemEntity } from 'src/entities/vw-item.entity';
import { GetItemResponseDTO } from '../dtos/get-item-response.dto';

export function vwItemEntityToDtoMapper(
  item: VwItemEntity,
  favoriteUserItemsIds: number[] = [],
): GetItemResponseDTO {
  const getItemResponseDTO: GetItemResponseDTO = {
    id: item.id,
    imageUrl: item.imageUrl,
    name: item.name,
    price: Number(item.price),
    stars: Number(item.stars),
    favorite: favoriteUserItemsIds.includes(item.id) ? true : false,
  };

  return getItemResponseDTO;
}
