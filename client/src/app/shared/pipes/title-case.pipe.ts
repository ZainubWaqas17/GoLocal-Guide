import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.replace(/\b\w/g, (char) => char.toUpperCase()) : '';
  }
}
