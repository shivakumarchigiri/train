import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APIResponse, Customer } from './model/train';
import { FormsModule } from '@angular/forms';
import { TrainService } from './service/train.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'firstproc';

  registerObj:Customer=new Customer();
  trainService=inject(TrainService);

  logInObj:any ={
    "phone":"",
    "password":""
  }

  loggedUser:Customer=new Customer();

  constructor(){
    const LocalData:any=localStorage.getItem('trainApp');
    if(LocalData != null){
      this.loggedUser = JSON.parse(LocalData);
    }
  }
  

  onLogOff(){
    this.loggedUser= new Customer()
    localStorage.removeItem('trainApp')
  }


  onRegister(){
 this.trainService.createNewCustomer(this.registerObj).subscribe((res:APIResponse)=>{
 
     if(res.result){
      alert("Register Successfully");
      this.closeRegister();
    }else{
      alert(res.message);
    }
 })
 }

 onLogIn(){
  this.trainService.onLogIn(this.logInObj).subscribe((res:APIResponse)=>{
  
      if(res.result){
        alert("Login Successfully");
        localStorage.setItem('trainApp',JSON.stringify(res.data));
        this.loggedUser=res.data;
        this.closeLogin();
     }else{
       alert(res.message);
     }
  })
  }
  
  openRegister(){
    const model= document.getElementById('registerModel');
    if(model != null){
      model.style.display='block'
    }
  }

  openLogin(){
    const model= document.getElementById('loginModel');
    if(model != null){
      model.style.display='block'
    }
  }

  closeRegister(){
    const model= document.getElementById('registerModel');
    if(model != null){
      model.style.display='none'
    }
  }

  closeLogin(){
    const model= document.getElementById('loginModel');
    if(model != null){
      model.style.display='none'
    }
  }

}
