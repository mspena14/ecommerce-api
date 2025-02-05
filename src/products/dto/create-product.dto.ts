import { IsArray, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CategoriesEnum } from "src/common/enums/categories.enum";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsDecimal()
    price: number;

    @IsNotEmpty()
    @IsInt()
    stock: number;

    @IsOptional()
    @IsArray()
    images?: string[];

    @IsNotEmpty()
    @IsEnum(CategoriesEnum)
    category: CategoriesEnum;
}
