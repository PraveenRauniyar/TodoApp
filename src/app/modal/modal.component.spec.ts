import {ModalComponent} from "./modal.component";
import {Todo} from "./todo";

describe('Modal Component', () => {
  let todoItems;
  let component;
  let mockDataService;
  let mockModalService;
  beforeEach(() => {
    todoItems = [{todoTitle: 'good', description: 'Preety', reminder: '2018-09-12'},
      {todoTitle: 'awe', description: 'some', reminder: '2019-04-03'},
      {todoTitle: 'nice', description: 'cool', reminder: '2019-11-12'}]
    mockDataService = jasmine.createSpyObj(['saveTodo', 'getAllTodo', 'deleteTodo', 'subscribe']);
    mockModalService = jasmine.createSpyObj(['open']);
    component = new ModalComponent(mockModalService, mockDataService);
    component.allTodoItems = todoItems;
  })

  describe('removeTodo', () => {
    it('should remove the todo from todoList', function () {
      component.removeTodo(todoItems[1]);
      expect(component.allTodoItems.length).toEqual(2);
    });
    it('should only remove given todo', function () {
      let expectedTodoItem = [{todoTitle: 'good', description: 'Preety', reminder: '2018-09-12'},
        {todoTitle: 'nice', description: 'cool', reminder: '2019-11-12'}]
      component.removeTodo(todoItems[1]);
      expect(component.allTodoItems).toEqual(expectedTodoItem)
    });

    it('should call the dataService', function () {
      component.removeTodo(todoItems[1]);
      expect(mockDataService.deleteTodo).toHaveBeenCalledWith('awe');
    });
  })

  describe('addTodo', () => {
    beforeEach(() => {
      component.addTodo('amit', 'good job', '2018-12-11')
    })
    it('should add todo in todoList', function () {
      expect(component.allTodoItems.length).toEqual(4);
    });
    it('should add correct only give todo details', function () {
      let addedTodoItem = new Todo('amit', 'good job', '2018-12-11');
      let expectedTodoItems = [addedTodoItem,{todoTitle: 'good', description: 'Preety', reminder: '2018-09-12'},
        {todoTitle: 'awe', description: 'some', reminder: '2019-04-03'},
        {todoTitle: 'nice', description: 'cool', reminder: '2019-11-12'}
      ]
      expect(component.allTodoItems).toEqual(expectedTodoItems);
    });
    it('should call dataService of SaveTodoMethod with correct parameter', function () {
      let addedTodoItem = new Todo('amit', 'good job', '2018-12-11');
      expect(mockDataService.saveTodo).toHaveBeenCalledWith(addedTodoItem)

    });
  })

  xdescribe('getTodoItems', ()=> {
    it('should call getAllTodoMethod of dataService ', function () {
      component.getTodoItems();
      expect(mockDataService.getAllTodo()).toHaveBeenCalled()

    });
  })


})
