import { Component, OnInit } from '@angular/core';
import { FeedsService } from '../../services/feeds.service';
import { Feed } from '../../models/Feed';
import { Article } from '../../models/Article';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  articles: Article[] = [];
  feeds: Feed[] = [];

  constructor(private feedsService: FeedsService) { }

  ngOnInit() {
    this.feedsService.getAllFeeds$().subscribe((feeds: Feed[]) => {
      if (feeds) {
        this.feeds = feeds;
      }
    });

    this.feedsService.getAllArticles$().subscribe((articles: Article[]) => {
      if (articles) {
        this.articles = articles;
      }
    });
  }

}
