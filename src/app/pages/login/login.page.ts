import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public postData = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private authService: AuthService, private storageService: StorageService, private toastService: ToastService) { }

  ngOnInit() {
  }

  validateInput(){
    let email = this.postData.email.trim();
    let password = this.postData.password.trim();

    return( this.postData.email && this.postData.password && email.length > 0 && password.length > 0)
  }
  
  loginAction(){
    if(this.validateInput()){      
      this.authService.login(this.postData).subscribe((res: any) => {
        if(res.data){
          this.storageService.store(AuthConstants.AUTH, res.data);
          this.router.navigate(['home']);
        }else{
          this.toastService.presentToast(res.error);
        }
      },
      (error: any) => {
        this.toastService.presentToast("Error de conexión.");
      })
    }else{
      this.toastService.presentToast("No pueden haber campos vacíos.")
    }
  }
}
