import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

	articleList = []

  constructor() {

  }

  // Use the News API to grab a set of articles to initialize our data set.
  // this can be replaced by an API call to my own REST API for the last assignment.
  loadArticles() {
  	const url = 'https://newsapi.org/v2/top-headlines?' +
          'sources=bbc-news&' +
          'apiKey=47b808e25f8840249e54ff65eb7b684a';
		const req = new Request(url);

  	return new Promise((resolve, reject) => {
  		fetch(req)
		    .then((response) => {
		    	response.json().then((res) => {
		    		//Give our articles a fake ID for now...
		    		let id = 1;
		    		//Map our articles response to the articleList, while also adding some required properties.
		    		this.articleList = res.articles.map(function(article) {
		    			article.recommended = 0;
		    			article._id = id;
		    			article.summary = [];
		    			id += 1;
		    			return article;
		    		});
		    		resolve(true);
		    	});
		    })
  	})
  }

  //increase the article's recommended count by 1
  recommend(id):void {
  	let index = this.getIndexById(id);
  	this.articleList[index].recommended += 1;
  }

  //Make a call to the Aylien article summarizer API and pass our articles information.
  //Note that this will not return exactly correct summary as the News API only provides truncated content (260 characters) for article unless you pay extra.
  summarize(id):void {
  	const index = this.getIndexById(id);
  	const article = this.articleList[index];
  	const url = `https://aylien-text.p.rapidapi.com/summarize?title=${article.title}&text=${article.content}`
  	const req = new Request(url);

  	fetch(req, {
  		headers: {
  			"X-RapidAPI-Key": "383a906dc3mshd72d11a64b349fcp1461c5jsnb21580e54f4e"
  		}
  	})
		.then((response) => {
			response.json().then((res) => {
				if(res.sentences)
		  		this.articleList[index].summary = res.sentences;
			})
		});
  }

  //A utility function to find an article's index.
  getIndexById(id) {
		return this.articleList.findIndex((article => article._id == id));
  }

  //Grab all articles that currently exist
  listArticles() {
  	return this.articleList;
  }
}
