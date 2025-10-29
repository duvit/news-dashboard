import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesListPage } from './articles-list-page';

describe('ArticlesListPage', () => {
  let component: ArticlesListPage;
  let fixture: ComponentFixture<ArticlesListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
