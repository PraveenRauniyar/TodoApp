import {ModalComponent} from './modal.component';
import {Todo} from './todo';
// import {Headers} from '@angular/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

// import { CustomHttpService } from './http.service';

describe('Modal Component', () => {
  let todoItems;
  let component;
  let mockModalService;
  let mockHttpService;
  beforeEach(() => {
    todoItems = [{todoTitle: 'good', description: 'Preety', reminder: '2018-09-12'},
      {todoTitle: 'awe', description: 'some', reminder: '2019-04-03'},
      {todoTitle: 'nice', description: 'cool', reminder: '2019-11-12'}];
    mockModalService = jasmine.createSpyObj(['open']);
    mockHttpService = jasmine.createSpyObj(['post', 'get']);
    component = new ModalComponent(mockModalService, mockHttpService);
    component.allTodoItems = todoItems;
  });

  describe('hasMinimumOneTodo', () => {
    it('should give true if list has minimum one todoItem', function () {
      expect(component.hasMinimumOneTodo(todoItems)).toBeTruthy();
    });

    it('should give false if list is empty', function () {
      expect(component.hasMinimumOneTodo([])).toBeFalsy();
    });
  });

  //
  // describe('addTodo', () => {
  //   beforeEach(() => {
  //     TestBed.configureTestingModule({
  //       imports: [HttpClientTestingModule]
  //     });
  //     it('should call saveTodo method with correct params', function () {
  //       component.addTodo('abc', 'nice', '2018-09-11');
  //       const todo = new Todo('abc', 'nice', '2018-09-11');
  //       const httpOptions = {
  //         headers: new Headers({
  //           'Content-Type': 'application/json'
  //         })
  //       };
  //       expect(component.saveTodoInDatabase).toHaveBeenCalledWith(todo, httpOptions);
  //
  //     });
  //   });

    describe('getTodoCategory', () => {
      it('should return today for both date are same', function () {
        expect(component.getTodoCategory('2018-11-09', '2018-11-09')).toEqual('today');
      });

      it('should return today for both date are same', function () {
        expect(component.getTodoCategory('2018-11-13', '2018-11-09')).toEqual('upcoming');
      });
      it('should return today for both date are same', function () {
        expect(component.getTodoCategory('2018-11-07', '2018-11-09')).toEqual('pending');
      });
    });

    // describe('addTodo', () => {
    //   beforeEach(() => {
    //     component.addTodo('amit', 'good job', '2018-12-11');
    //   });
    //   it('should add todo in todoList', function () {
    //     expect(component.allTodoItems.length).toEqual(4);
    //   });
    //   it('should add correct only give todo details', function () {
    //     const addedTodoItem = new Todo('amit', 'good job', '2018-12-11');
    //     const expectedTodoItems = [addedTodoItem, {todoTitle: 'good', description: 'Preety', reminder: '2018-09-12'},
    //       {todoTitle: 'awe', description: 'some', reminder: '2019-04-03'},
    //       {todoTitle: 'nice', description: 'cool', reminder: '2019-11-12'}
    //     ];
    //     expect(component.allTodoItems).toEqual(expectedTodoItems);
    //   });
    //   it('should call dataService of SaveTodoMethod with correct parameter', function () {
    //     const addedTodoItem = new Todo('amit', 'good job', '2018-12-11');
    //     expect(mockDataService.saveTodo).toHaveBeenCalledWith(addedTodoItem);
    //
    //   });
    // });
    //
    // xdescribe('getTodoItems', () => {
    //   it('should call getAllTodoMethod of dataService ', function () {
    //     component.getTodoItems();
    //     expect(mockDataService.getAllTodo()).toHaveBeenCalled();
    //
    //   });
    // });


});
