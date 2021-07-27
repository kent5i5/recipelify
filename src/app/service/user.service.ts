import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User} from '../models/User';
import { Hero } from '../models/Hero';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private serverUrl = 'http://localhost:8081/HelloSpringMVC/avengers';

  private ChefRecipesrl = 'http://localhost:8088/boot/users';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // getHeros(): Observable<Hero[]> {
  //  // const heroes = of(HEROES);
  //   return this.http.get<Hero[]>(this.serverUrl)
  //   .pipe(
  //     catchError(this.handleError<Hero[]>('getHeroes', []))
  //   );
  // }
  // /** GET hero by id. Will 404 if id not found */
  // getHero(id: number): Observable<Hero> {
  //   const url = `${this.serverUrl}/${id}`;
  //   //return this.http.get<Hero>(url) as Observable<Hero>;
  //   return this.http.get<Hero>(url)
  //   .pipe(
  //     tap(_ => this.log(`fetched hero id=${id}`)),
  //     catchError(this.handleError<Hero>(`getHero id=${id}`))
  //   );
  // }

  login() {
    // your login function.
    //this.http.post(this.ChefRecipesrl);
  }

  /*
    Retrieve all the user data from backend 
    return a Observable<User[]> object 
    error is handled by handleError method 
  */
  getUsers(): Observable<User[]> {

     return this.http.get<User[]>(this.ChefRecipesrl)
     .pipe(
       catchError(this.handleError<User[]>('getUsers', []))
     );
   }

     /*
    Retrieve a the user data by its id from backend 
    return a Observable<User> object 
    error is handled by handleError method 
  */
   getUser(id: number): Observable<User> {
    const url = `${this.ChefRecipesrl}/${id}`;
    
    return this.http.get<User>(url) 
    .pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<User>(`getHero id=${id}`)) 
    );
  }

  /*
  Error handling method provided by offical angular tutorial
  which will get call if the http request occurs error.
  */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /*
  method that log the error message
  */
  private log(message: string) {
    //this.messageService.add(`HeroService: ${message}`);
    console.log(message);
   }
}
