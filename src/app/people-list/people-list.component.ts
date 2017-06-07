import { Component, OnInit } from '@angular/core';
import { Person } from  '../person';
import { ActivatedRoute, Router } from "@angular/router";

import { PeopleService } from "app/people.service";

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html', 
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  person2 = new Person();
 
  public xyz:any;
  
  constructor(private route: ActivatedRoute,
              private peopleService: PeopleService,
              private router: Router) { }

  ngOnInit(){
    
    this.peopleService
      .getAll()
      .subscribe(
        p => this.people = p,
        e => this.errorMessage = e,
        () => this.isLoading = false);
  }

 createPersonDetails(){
  //  console.log(person.value);
  //  alert(JSON.stringify(person.value));
   console.log(this.person2);
      this.peopleService
          .create(this.person2)
          .subscribe(r =>{
            this.xyz = r;
            this.person2.id = this.xyz.id;
            this.people.push (this.person2);
          });
          
  }

  delete(person: Person, index: number){
    // alert (index);
    this.peopleService
    .delete(person.id)
    .subscribe(r => {
      this.people.splice (index, 1);
    });

  }
    
  

}