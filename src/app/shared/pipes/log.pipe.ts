import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'log'
})
export class LogPipe implements PipeTransform {
  transform(value: any) {
    console.log(value);
    // return value;
  }
}
