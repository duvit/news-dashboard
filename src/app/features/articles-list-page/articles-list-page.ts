import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { ArticleSearch } from '../article-search/article-search';
import { ArticleCard } from '../article-card/article-card';
import { ArticleService } from '../../services/article-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-articles-list-page',
  imports: [ArticleSearch, ArticleCard, MatProgressSpinnerModule],
  templateUrl: './articles-list-page.html',
  styleUrl: './articles-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesListPage {
  private readonly articlesService = inject(ArticleService);

  readonly searchTerm = signal('');
  readonly loading = signal(false);
  readonly articlesData = signal<any>({
    results: [],
    next: null,
    previous: null,
    count: null,
  });

  readonly hasResults = computed(() => this.articlesData().results.length > 0);

  constructor() {
    this.loadArticles();
  }

  private loadArticles(offset = 0): void {
    const keywords = this.searchTerm().trim();
    this.loading.set(true);

    const obs = keywords
      ? this.articlesService.searchArticles(keywords, offset)
      : this.articlesService.getArticles(offset);

    obs.pipe(take(1)).subscribe({
      next: (res) => {
        this.articlesData.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.articlesData.set({
          results: [],
          next: null,
          previous: null,
          count: null,
        });
        this.loading.set(false);
      },
    });
  }

  onSearch(keywords: string): void {
    this.searchTerm.set(keywords);
    this.loadArticles(0);
  }

  loadPage(url: string | null): void {
    if (!url) return;
    this.loading.set(true);

    this.articlesService
      .getArticlesByUrl(url)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.articlesData.set(res);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }
}
