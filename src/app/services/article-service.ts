import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

export interface ArticleResponse {
  results: Article[];
  next: string | null;
  previous: string | null;
  count: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.spaceflightnewsapi.net/v4/articles/';

  getArticles(offset = 0, limit = 10): Observable<ArticleResponse> {
    const params = new HttpParams().set('offset', offset.toString()).set('limit', limit.toString());

    return this.http.get<ArticleResponse>(this.apiUrl, { params });
  }

  getArticleById(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}${id}/`);
  }

  searchArticles(keywords: string, offset = 0, limit = 10): Observable<ArticleResponse> {
    const params = new HttpParams()
      .set('search', keywords)
      .set('offset', offset.toString())
      .set('limit', limit.toString());

    return this.http.get<ArticleResponse>(this.apiUrl, { params });
  }

  getArticlesByUrl(url: string): Observable<ArticleResponse> {
    return this.http.get<ArticleResponse>(url);
  }
}
