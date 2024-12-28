import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public convertToEmptyString(value: string | undefined){
    return (value == null || value == undefined) ? "" : value;
  }

  public convertMeasurement(measurement: any, measurementUnit: any){
    if(measurement == null || measurementUnit == null){
      return null;
    }
    return `${measurement} ${measurementUnit}`;
  }

  public placeAliasCommas(alias: string[]){
    let aliasConverted: string = "";
    for(let i = 0; i < alias.length; i++){
      if(alias[i] != null){
        aliasConverted += alias[i];
        if(i < (alias.length - 1) && alias[i+1] != null){
          aliasConverted += ",";
        }
      }
    }
    return aliasConverted;
  }

  public divideMeasurement(measurement: string){
    if(measurement == null || measurement.trim() == ""){
      return [null, null];
    }
    
    return measurement.split(" ");
  }
}
