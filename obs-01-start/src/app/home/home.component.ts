import {Component, OnDestroy, OnInit, Output} from '@angular/core';

import {interval, Observable, Subscription} from "rxjs";
import{map,filter} from "rxjs/operators"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  @Output()
  private firstObsSub: Subscription;

  constructor() { }

  ngOnInit() {
/*    this.firstObsSub =interval(1000).subscribe(count => {
      console.log(count);
    })
*/

  /*const custumIntervalObservable = new Observable((observer) =>{
    let count = 0;
    setInterval(() => {
      observer.next(count);
      count++;
    },500);
  });*/


    const custumIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(()=>{
        observer.next(count);
        if (count === 5){
          observer.complete();
        }
        if(count>3){
          observer.error(new Error('Count is > 3 '));
        }
        count++;
      },1000)
    })



    this.firstObsSub =   custumIntervalObservable.pipe(filter(data => {
      return data>0;
    }),map((data: number) =>{
      return 'Round: '+ (data + 1);
    })).subscribe((data: number) =>{
      console.log(data);
    },error =>{
      console.log(error) ;
      alert(error);
    }, () =>{
      console.log("Completed ! ")
    })
  }

  ngOnDestroy():void {
    this.firstObsSub.unsubscribe();
  }

}
