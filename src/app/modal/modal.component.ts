import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Todo} from './todo';
import {formatDate} from '@angular/common';
import 'rxjs-compat/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  todayTodoItems: Array<Todo>;
  pendingTodoItems: Array<Todo>;
  upcomingTodoItems: Array<Todo>;
  todayDate: string;
  private todoCategories: { 'today': Array<Todo>; 'upcoming': Array<Todo>; 'pending': Array<Todo> };

  constructor(private http: HttpClient, private modalService: NgbModal) {
    this.todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530');
  }

  ngOnInit() {
    this.getTodoItems();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  public getTodoCategory(reminder, todayDate) {
    if (reminder === todayDate) {
      return 'today';
    } else if (reminder > todayDate) {
      return 'upcoming';
    }
    return 'pending';
  }

  addTodo(title, description, reminder) {
    if (title === '' || reminder === '') {
      return;
    }
    const todo = new Todo(title, description, reminder);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.saveTodoInDatabase(todo, httpOptions);
  }

  saveTodoInDatabase(todo, httpOptions) {
    this.todoCategories = this.getCategoryWiseTodoList();
    this.http.post('http://localhost:8080/addTodo', JSON.stringify(todo), httpOptions)
      .subscribe((todoId) => {
          todo.todoId = todoId;
          this.todoCategories[this.getTodoCategory(todo.reminder, this.todayDate)].unshift(todo);
          }, err => console.error(err)
      );
  }

  getTodoItems() {
    this.http.get('http://localhost:8080')
      .subscribe((todoItems: Array<Todo>) => {
        this.todayTodoItems = todoItems.filter((todoItem) => todoItem.reminder === this.todayDate);
        this.upcomingTodoItems = todoItems.filter((todoItem) => todoItem.reminder > this.todayDate);
        this.pendingTodoItems = todoItems.filter((todoItem) => todoItem.reminder < this.todayDate);
      });
  }

  removeTodo(todo: Todo) {
    this.todoCategories = this.getCategoryWiseTodoList();
    this.http.delete('http://localhost:8080/delete/' + todo.todoId).subscribe(() => {
       const category = this.getTodoCategory(todo.reminder, this.todayDate);
       this.todoCategories[category].splice(this.todoCategories[category].indexOf(todo, 1));
    }, err => console.error(err));
  }

  public hasMinimumOneTodo(todoItems: Array<Todo>) {
    return todoItems.length > 0;
  }

  private getCategoryWiseTodoList() {
    return {'today': this.todayTodoItems, 'upcoming': this.upcomingTodoItems, 'pending': this.pendingTodoItems};
  }
}
