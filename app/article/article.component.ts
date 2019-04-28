import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

	@Input() article;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
  }

  recommend(id):void {
  	this.articleService.recommend(id);
  }

  generateSummary(id):void {
  	this.articleService.summarize(id);
  }
}
