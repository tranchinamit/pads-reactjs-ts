export interface IProfile {
  accountId: number;
  accountOid: string;
  address: string;
  avatar: string;
  createdAt: number;
  email: string;
  accountName: string;
  isActive: boolean;
  phone: number;
  updateAt: number;
}

export class ProfileDTO implements IProfile {
  public accountId: number = 0;
  public accountOid: string = '';
  public address: string = '';
  public avatar: string = '';
  public createdAt: number = 0;
  public email: string = '';
  public accountName: string = '';
  public isActive: boolean = false;
  public phone: number = 0;
  public updateAt: number = 0;

  constructor(data?: ProfileDTO) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this)[property] = (data)[property];
        }
      }
    }
  }
}
