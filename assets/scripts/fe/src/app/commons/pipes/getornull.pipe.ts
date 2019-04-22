import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getornull'
})
export class GetornullPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // check if the array is not empty. return
    // the value of the specified array item based
    // on it's list.
    args = args || 0;
    return value.length > 0 && value.length > args ? value[args].content : "";
  }

}
