
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { PeopleService } from "../people.service";
import { Person } from "../person";


@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailsComponent implements OnInit, OnDestroy {
  professions: string[] = ['jedi', 'bounty hunter', 'princess', 'sith lord'];
  person: Person;
  sub:any;

  constructor(private route: ActivatedRoute,
              private peopleService: PeopleService,
              private router: Router) { }

  ngOnInit() { 
    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      console.log('getting person with id: ', id);
      this.peopleService
        .get(id)
        .subscribe(p => this.person = p);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoPeopleList(){
    let link = ['/persons'];
    this.router.navigate(link);
  }

  savePersonDetails(){
      this.peopleService
          .save(this.person)
          .subscribe(r => console.log(`saved!!! ${JSON.stringify(this.person)}`));
  }

 

  /* 
  //alternatively use:
  gotoPeoplesList(){
      window.history.back();
  }
  */

}
