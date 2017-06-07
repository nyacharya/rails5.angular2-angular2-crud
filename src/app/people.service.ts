import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Person } from './person';

// const PEOPLE : Person[] = [
//       {id: 1, name: 'Luke Skywalker', height: 177, weight: 70},
//       {id: 2, name: 'Darth Vader', height: 200, weight: 100},
//       {id: 3, name: 'Han Solo', height: 185, weight: 85},
//     ];

@Injectable()
export class PeopleService{
  private baseUrl: string = 'http://localhost:3000/';
  constructor(private http : Http){
  }

  getAll(): Observable<Person[]>{
       return this.http.get(`${this.baseUrl}/people`)
        .map(this.extractData)
        .catch(this.handleError);
}
  
  private extractData(res:Response) {
    let body = res.json();
    return body || [];
}

private handleError(error:any) {
   
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
}

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
  get(id: number): Observable<Person> {
    let person$ = this.http
      .get(`${this.baseUrl}/people/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
      return person$;
  }

  save(person: Person) : Observable<Response>{
    
  console.log(JSON.stringify(person));
    return this
      .http
      .put(`${this.baseUrl}/people/${person.id}`, 
            person, 
            {headers: this.getHeaders()})
            
  }

  create(person: Person) : Observable<Response>{
  console.log(JSON.stringify(person));
    // alert(person.name);
      return this
      .http
      .post(`${this.baseUrl}/people/`, 
            person, 
            {headers: this.getHeaders()})
  }

 delete(id: number): Observable<Response> {
   console.log(`${this.baseUrl}/people/${id}`)
    return this.http
        .delete(`${this.baseUrl}/people/${id}`,{headers: this.getHeaders()})
        .map(this.extractData)
        .catch(this.handleError);
    } 

}

