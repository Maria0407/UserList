import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {HandleError, HttpErrorHandlerService} from "../http-error-handler.service";
import {Observable} from "rxjs";

import {catchError} from "rxjs/operators";
import {Person} from "./person";

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  private handleError: HandleError

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError("PersonsService")
  }

  getPersons(): Observable<Person[]>{
    return this.http
      .get<Person[]>('api/persons')
      .pipe(catchError(this.handleError('getPersons',[])))
  }

  addPerson(person: Person): Observable<Person>{
    return this.http
      .post<Person>('api/persons',person)
      .pipe(catchError(this.handleError('addPerson',person)))
  }

  deletePerson(id: number): Observable<{}>{
    return this.http
      .delete(`api/persons/${id}`)
      .pipe(catchError(this.handleError('deletePerson')))
  }

  updatePerson(person: Person): Observable<Person>{
    return this.http
      .put<Person>(`api/persons/${person.id}`,person)
      .pipe(catchError(this.handleError('updatePerson',person)))
  }
}
