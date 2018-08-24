import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Todo} from "./todo";
import {DataService} from "../service/data.service";


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  allTodoItems: Array<Todo>;

  constructor(private modalService: NgbModal, private dataService: DataService) {

  }

  ngOnInit() {
    this.getTodoItems();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addTodo(title, description, reminder) {
    if (title == '' || reminder == '') {
      return;
    }
    let todo = new Todo(title, description, reminder);
    this.dataService.saveTodo(todo)
    this.allTodoItems.unshift(todo);

  }

  getTodoItems() {
    this.dataService.getAllTodo().subscribe((todo) => {
      this.allTodoItems = todo;
    });
  }

  removeTodo(todo: Todo) {
    let index = this.allTodoItems.indexOf(todo);
    this.allTodoItems.splice(index, 1);
    this.dataService.deleteTodo(todo.todoTitle)
  }
}
