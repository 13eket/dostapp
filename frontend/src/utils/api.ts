import snakecaseKeys from 'snakecase-keys';

export function toSnakeCaseDeep(obj: any) {
  return snakecaseKeys(obj, { deep: true });
}
