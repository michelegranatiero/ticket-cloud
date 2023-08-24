import { Injectable } from '@angular/core';
import { Event } from './event';
import { EVENTS } from './mock-events';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})

export class EventService {

  //private eventsUrl = 'https://nbm2hi6toj.execute-api.us-east-1.amazonaws.com/default/getEvents';  // URL to web api
  private eventsUrl = 'https://zi00b7ns35.execute-api.us-east-1.amazonaws.com/Prod'; // URL to web api

  constructor(
    private http: HttpClient) { }

    // GET Events
    getEvents() : Observable<Event[]> {
      console.log("Returning events")
      return this.http.get<Event[]>(this.eventsUrl).pipe(map( (res) => {
        var events: Event[] = []
        events = JSON.parse(res["body"]);
        return events;
      }))
      // events.subscribe(responseData => console.log(responseData))
    }

    /** 
    getEvent(id: number) : Observable<Event> {
      const event = EVENTS.find(e => e.id === id)!;
      return of(event)
    }
    */
    // Get Event by ID
    getEvent(id: number): Observable<Event> {
      const url = `${this.eventsUrl}/${id}`;
      return this.http.get<Event>(url);
    }

    // Get Events by search term
    searchEvent(term: string): Observable<Event[]> {
      if (!term.trim()) {
        // if not search term, return empty hero array.
        return of([]);
      }
      return this.http.get<Event[]>(`${this.eventsUrl}/?name=${term}`);
    }

  }
