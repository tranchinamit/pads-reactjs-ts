// Subcategory
export interface ISubCategory {
  subCategoryId: number;
  subCategoryName: string;
}

// export class SubCategoryDTO implements ISubCategory {
//   public subCategoryId: number = 0;
//   public subCategoryName: string = '';

//   constructor(data?: SubCategoryDTO) {
//     if (data) {
//       for (const property in data) {
//         if (data.hasOwnProperty(property)) {
//           (this)[property] = (data)[property];
//         }
//       }
//     }
//   }
// }

// Category
export interface ICategory {
  categoryId: number;
  categoryName: string;
  imageLink: string;
  subCategory: ISubCategory[];
}

// export interface ICategoryState {
//   categoryId: number;
//   categoryName: string;
//   imageLink: string;
//   subCategory: ISubCategory[];
// }

export class CategoryDTO implements ICategory {
  public categoryId: number = 0;
  public categoryName: string = '';
  public imageLink: string = '';
  public subCategory: ISubCategory[] = [];

  constructor(data?: CategoryDTO) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this)[property] = (data)[property];
        }
      }
    }
  }
}
