import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';
import {Todo} from "../modal/todo";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // result: boolean;
  private error: boolean;

  constructor(public http: Http) {
    console.log('data service connected');
  }

  getAllTodo() {
    return this.http.get('http://localhost:8080').map(response => response.json());
  }

  saveTodo(todo: Todo) {
    let httpOptions = {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('http://localhost:8080/addTodo', JSON.stringify(todo), httpOptions).subscribe(
      () => {
      }, err => console.error(err)
    );
  }

  deleteTodo(id: LongRange){
    return this.http.delete('http://localhost:8080/delete/' + id).subscribe(() => {
    }, err => console.error(err));
  }
}
