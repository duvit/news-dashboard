import { Routes } from '@angular/router';

import { ArticlesListPage } from './features/articles-list-page/articles-list-page';
import { ArticlePage } from './features/article-page/article-page';

export const routes: Routes = [
  {
    path: '',
    component: ArticlesListPage,
  },
  {
    path: 'article/:id',
    component: ArticlePage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
