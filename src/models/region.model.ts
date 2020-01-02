// Area
export interface IArea {
  areaId: number;
  areaName: string;
}

// export class AreaDTO implements IArea {
//   areaId: number = null;
//   areaName: string = null;

//   constructor(data?: AreaDTO ) {
//     if (data) {
//       for (const property in data) {
//         if (data.hasOwnProperty(property)) {
//           (<any>this)[property] = (<any>data)[property];
//         }
//       }
//     }
//   }
// }

// Region
export interface IRegion {
  regionId: number;
  regionName: string;
  area: IArea[];
}

export class RegionDTO implements IRegion {
  public regionId: number = 0;
  public regionName: string = '';
  public area: IArea[] = [];

  constructor(data?: RegionDTO) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this)[property] = (data)[property];
        }
      }
    }
  }
}

// Region
// export interface IRegionList {
//   region: RegionDTO[];
// }

// export class RegionListDTO implements IRegionList {
//   region: RegionDTO[] = [];

//   constructor(data?: RegionListDTO) {
//     if (data) {
//       for (const property in data) {
//         if (data.hasOwnProperty(property)) {
//           (<any>this)[property] = (<any>data)[property];
//         }
//       }
//     }
//   }
// }
