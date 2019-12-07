import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
})
export class FeedCardComponent implements OnInit {

  feedData: any;
  constructor(private feedService: FeedService) { }

  ngOnInit() {

    this.feedService.feedData$.subscribe((res: any) => {
      this.feedData = res;
    })
  }

}
