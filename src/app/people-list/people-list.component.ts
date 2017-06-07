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

  
  constructor(private route: ActivatedRoute,
              private peopleService: PeopleService,
              private router: Router) { }

  ngOnInit(){
    
    this.peopleService
      .getAll()
      .subscribe(
         /* happy path */ p => this.people = p,
         /* error path */ e => this.errorMessage = e,
         /* onCompleted */ () => this.isLoading = false);
  }

 createPersonDetails(){
  //  console.log(person.value);
  //  alert(JSON.stringify(person.value));
   console.log(this.person2);
      this.peopleService
          .create(this.person2)
          .subscribe(r => console.log(`created!!! ${JSON.stringify(this.person2)}`));
          
  }

  delete(person: Person){
    this.peopleService
    .delete(person.id)
    .subscribe(r => console.log(`deleted!!! ${JSON.stringify(person)}`));

  }
    
  

}