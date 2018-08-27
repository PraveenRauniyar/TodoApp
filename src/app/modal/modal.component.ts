import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Todo} from './todo';
import {Headers, Http} from '@angular/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  allTodoItems: Array<Todo>;

  constructor(private http: Http, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.getTodoItems();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addTodo(title, description, reminder) {
    if (title === '' || reminder === '') {
      return;
    }
    const todo = new Todo(title, description, reminder);
    const httpOptions = {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    this.saveTodoInDatabase(todo, httpOptions);
  }

  saveTodoInDatabase(todo, httpOptions) {
    this.http.post('http://localhost:8080/addTodo', JSON.stringify(todo), httpOptions)
      .map(response => response.json())
      .subscribe((todoId) => {
          todo.todoId = todoId;
          this.allTodoItems.unshift(todo);
        }, err => console.error(err)
      );
  }

  getTodoItems() {
    this.http.get('http://localhost:8080')
      .map(response => response.json())
      .subscribe((todo) => {
        this.allTodoItems = todo;
      });
  }

  removeTodo(todo: Todo) {
    const index = this.allTodoItems.indexOf(todo);
    return this.http.delete('http://localhost:8080/delete/' + todo.todoId).subscribe(() => {
      this.allTodoItems.splice(index, 1);
    }, err => console.error(err));
  }
}
