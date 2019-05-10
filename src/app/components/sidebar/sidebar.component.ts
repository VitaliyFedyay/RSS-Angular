import { Component, OnInit } from '@angular/core';
import { FeedsService } from '../../services/feeds.service';
import { Feed } from '../../models/Feed';
import { HttpErrorResponse } from '@angular/common/http';
import { feedsConst } from '../../constants/feeds.const';
import { Article } from '../../models/Article';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  activeFeeds: Feed[] = [];
  submitted = false;
  active = false;

  showWarning = false;
  warningMessage: string;
  searchText: any;

  articles: Article[] = [];
  feeds: Feed[] = [];

  constructor(private feedsService: FeedsService) {}

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

    if (localStorage.getItem('feeds')) {
      this.activeFeeds = JSON.parse(localStorage.getItem('feeds'));
      this.activeFeeds.map((feed: Feed) => {
        this.add(undefined, feed.feed.url);
      });
    }
    this.feedsService.getAllFeeds$().subscribe((feeds: Feed[]) => {
      if (feeds) {
        this.activeFeeds = feeds;
      }
    });
  }

  add(feedName: string, feedUrl: string) {
    feedUrl = feedUrl.trim();
    if (!feedUrl) {
      return;
    }
    this.feedsService.addFeed(feedUrl).subscribe(
      res => {
        if (res && res.code === 1000) {
          this.showWarning = true;
          this.warningMessage = res.message && res.message;
          setTimeout(() => {
            this.showWarning = false;
          }, 5000);
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === feedsConst.errorCodes.server.internalServer) {
          this.showWarning = true;
          this.warningMessage = error.error.message;
          setTimeout(() => {
            this.showWarning = false;
          }, 5000);
        }
      }
    );
  }

  delete(feed: Feed) {
    this.activeFeeds = this.activeFeeds.filter(f => f !== feed);
    this.feedsService.deleteFeed(feed);
  }
}
