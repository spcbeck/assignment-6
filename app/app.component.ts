import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'summarizr';

  constructor(private articleService:ArticleService) {

  }

  articleList = [];

  ngOnInit() {
  	this.articleService.loadArticles().then((response) => {
  		this.articleList = this.articleService.listArticles();
  		console.log(this.articleService.listArticles());
  	});
  }
}
