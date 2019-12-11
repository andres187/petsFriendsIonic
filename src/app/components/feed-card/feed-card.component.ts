import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
})
export class FeedCardComponent implements OnInit {

  displayUserData: any;
  feedData: any;
  feedDataById: any;
  postData = {
    user_id: '',
    token: ''
  }
  constructor(private authService: AuthService, private feedService: FeedService, private toastService: ToastService, private location: Location) { }

  ngOnInit() {
    this.authService.userData$.subscribe((res:any) => {
        this.displayUserData = res;
    });
    this.feedService.feedData$.subscribe((res: any) => {
      this.feedData = res;
    })
  }  

  getFeedDataById(servicioId: number){
    this.postData.user_id = this.displayUserData.user_Id;
    this.postData.token = this.displayUserData.token;
    
    if(this.postData.user_id && this.postData.token){
      this.feedService.getFeedDataById(this.postData.token, servicioId).subscribe((res:any) => {
        console.log(res.data)
        this.feedService.changeFeedDataById(res.data);
        this.feedService.feedDataById$.subscribe((res: any) => {
          this.feedDataById = res;
        })
      }, (error: any) => {
        this.toastService.presentToast("Error de conexión.");
      })
    }else{
      console.log("loading...");
    }
  }

  volver(){
    this.feedDataById = null;
  }

}
