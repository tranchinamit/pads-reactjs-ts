export interface IAds {
  adId: number;
  createdAt: number;
  accountId: number;
  accountOid: string;
  accountName: string;
  title: string;
  content: string;
  areaId: string;
  areaName: string;
  regionId: string;
  regionName: string;
  categoryId: number;
  categoryName: string;
  subCategoryId: number;
  subCategoryName: string;
  phone: string;
  price: number;
  priceString: string;
  avatar: string;
  condition: string;
}

export class AdsDTO implements IAds {
  public adId: number = 0;
  public createdAt: number = 0;
  public createdAtDate?: string = '';
  public accountId: number = 0;
  public accountOid: string = '';
  public accountName: string = '';
  public title: string = '';
  public content: string = '';
  public areaId: string = '';
  public areaName: string = '';
  public regionId: string = '';
  public regionName: string = '';
  public categoryId: number = 0;
  public categoryName: string = '';
  public subCategoryId: number = 0;
  public subCategoryName: string = '';
  public phone: string = '';
  public price: number = 0;
  public priceString: string = '';
  public imagesLink: string[] = [];
  public avatar: string = '';
  public condition: string = '';

  constructor(data?: AdsDTO) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this)[property] = (data)[property];
        }
      }
    }
  }
}
