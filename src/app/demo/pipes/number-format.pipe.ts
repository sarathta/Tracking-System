import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(val: number, dec: number): string {
   
    if (val !== undefined && val !== null) {

      if(dec!== undefined && dec!== null){
        val = parseFloat(val?.toFixed(dec));
      }
      // here we just remove the commas from value
      return val.toString().replace(/,/g, "");
    } else {
      return "";
    }
  }
}