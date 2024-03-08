import { prisma } from "../database/prisma";
import { CategoryCreate, CategoryReturn } from "../interfaces/category.interfaces";

export class categoryService {
    public create = async (categorys: CategoryCreate): Promise<CategoryReturn> => {
      const category = await prisma.category.create({ data: categorys });
      return category;
    };

    public delete = async (CategoryId: number): Promise<void> => {
      await prisma.category.delete({ where: { id: CategoryId } });
    };
}