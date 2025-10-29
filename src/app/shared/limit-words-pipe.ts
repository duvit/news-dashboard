import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitWords',
})
export class LimitWordsPipe implements PipeTransform {
  transform(text: string, limit: number): string {
    if (!text) return '';
    if (limit <= 0) return text;
    return text.length > limit ? text.slice(0, limit).trimEnd() + '...' : text;
  }
}
