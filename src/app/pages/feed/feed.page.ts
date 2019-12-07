import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FeedService } from 'src/app/services/feed.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  displayUserData: any;
  postData = {
    user_id: '',
    token: ''
  }

  constructor(private authService: AuthService, private feedService: FeedService, private toastService: ToastService) { }

  ngOnInit() {
    this.authService.userData$.subscribe((res:any) => {
        this.displayUserData = res;
        this.getFeedData();
    });
  }

  getFeedData(){

    this.postData.user_id = this.displayUserData.user_Id;
    this.postData.token = this.displayUserData.token;
    
    if(this.postData.user_id && this.postData.token){
      this.feedService.getFeedsData(this.postData.token).subscribe((res:any) => {
        console.log(res.data);
        this.feedService.changeFeedData(res.data);
      }, (error: any) => {
        this.toastService.presentToast("Error de conexión.");
      })
    }else{
      console.log("loading...");
    }

  }

}
