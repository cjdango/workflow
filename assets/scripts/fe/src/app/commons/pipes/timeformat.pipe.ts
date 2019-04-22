import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeformat'
})
export class TimeformatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // transform the value into hour minute format.
    let hours = parseInt(value);

    if (value % 1 === 0) {
        return `<span>${hours}H</span>`;
    }
    let minutes = (parseInt(value.split(".")[1]) * 60) / 100;
    return `<span>${hours}H<span>&nbsp;</span><span>${minutes}M</span>`;
  }

}
