import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';
import {Todo} from "../modal/todo";

@Injectable({
  providedIn: 'root'
})
export class DataService {

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

  deleteTodo(title: String){
    return this.http.delete('http://localhost:8080/delete/' + title).subscribe(() => {
    }, err => console.error(err));
  }
}
