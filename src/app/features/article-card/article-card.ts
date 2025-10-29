import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LimitWordsPipe } from '../../shared/limit-words-pipe';
import { HighlightPipe } from '../../shared/highlight-pipe';
import { DatePipe } from '@angular/common';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-card',
  imports: [RouterLink, LimitWordsPipe, HighlightPipe, DatePipe],
  templateUrl: './article-card.html',
  styleUrl: './article-card.scss',
})
export class ArticleCard {
  readonly article = input.required<Article>();
  readonly keywords = input<string>('');
}
