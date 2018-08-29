import {ModalComponent} from './modal.component';
import {Todo} from './todo';

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
    component = new ModalComponent(mockModalService, mockHttpService);
    component.allTodoItems = todoItems;
  });

  describe('hasMinimumOneTodo', () => {
    it('should give true if list has minimum one todoItem', function () {
      expect( component.hasMinimumOneTodo(todoItems)).toBeTruthy();
    });

    it('should give false if list is empty', function () {
      expect( component.hasMinimumOneTodo([])).toBeFalsy();
    });
    // it('should only remove given todo', function () {
    //   const expectedTodoItem = [{todoTitle: 'good', description: 'Preety', reminder: '2018-09-12'},
    //     {todoTitle: 'nice', description: 'cool', reminder: '2019-11-12'}];
    //   component.removeTodo(todoItems[1]);
    //   expect(component.allTodoItems).toEqual(expectedTodoItem);
    // });

    // it('should call the dataService', function () {
    //   component.removeTodo(todoItems[1]);
    //   expect(mockDataService.deleteTodo).toHaveBeenCalledWith(
    // });
  });

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
