import { Component, inject,OnInit } from '@angular/core';
import { TrainService } from '../../service/train.service';
import { IStation } from '../../model/train';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  trainService=inject(TrainService)
  router=inject(Router)
  stationList:IStation[]=[];
  fromStationId:number=0;
  toStationId:number=0;
  dataOfTravel:string='';


  ngOnInit(): void {
    this.loadAllStation();
  }
  loadAllStation(){
    this.trainService.getAllStations().subscribe((res:any)=>{
      this.stationList=res.data;

    })
  }

  onSearch(){
    if(this.fromStationId==0 || this.toStationId == 0 || this.dataOfTravel==''){

      alert("Select your journey details")

    }else{
      if(this.fromStationId==this.toStationId){
        alert("from and to station cant be same")
      }
      else{
        this.router.navigate(['/search',this.fromStationId,this.toStationId,this.dataOfTravel])
      }
    }
  }

}
