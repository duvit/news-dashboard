import { Component, signal, effect, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-article-search',
  imports: [MatIconModule],
  templateUrl: './article-search.html',
  styleUrl: './article-search.scss',
})
export class ArticleSearch {
  readonly term = signal('');
  readonly search = output<string>();
  private readonly debounceDelay = 300;
  private debounceTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      const value = this.term().trim();
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => this.search.emit(value), this.debounceDelay);
    });
  }

  onInput(event: Event) {
    this.term.set((event.target as HTMLInputElement).value);
  }
}
