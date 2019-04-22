import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize'
})
export class PluralizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // pluralize the value if the items
    // are more than 1.
    return value.length > 1 ? args ? args: "s" : "";
  }

}
