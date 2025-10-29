import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filter, map, switchMap, take } from 'rxjs';
import { ArticleService } from '../../services/article-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-article-page',
  imports: [RouterLink, MatProgressSpinnerModule],
  templateUrl: './article-page.html',
  styleUrl: './article-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePage {
  private route = inject(ActivatedRoute);
  private articleService = inject(ArticleService);

  private articleId$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    filter((id): id is string => !!id)
  );

  readonly article = toSignal(
    this.articleId$.pipe(switchMap((id) => this.articleService.getArticleById(id))),
    { initialValue: null }
  );

  readonly hasArticle = computed(() => !!this.article());
}
