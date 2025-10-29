import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, keywords?: string | null): string {
    if (!text || !keywords?.trim()) return text;

    const words = keywords
      .split(/[\s,]+/)
      .map((w) => w.trim())
      .filter(Boolean);

    return words.reduce((acc, word) => {
      const regex = new RegExp(`(${this.escapeRegExp(word)})`, 'gi');
      return acc.replace(regex, '<mark>$1</mark>');
    }, text);
  }

  private escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
