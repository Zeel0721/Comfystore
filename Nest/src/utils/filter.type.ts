import { IsOptional } from 'class-validator';

export class Filter {
  page: number;

  @IsOptional()
  search?: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  company?: string;

  @IsOptional()
  sort?: string;

  @IsOptional()
  price?: string;

  @IsOptional()
  freeShipping?: boolean;
}
