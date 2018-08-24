import {AppPage} from './app.po';
import {browser, by, element} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to the Todo App!');
  });

  it('should show addTodoButton', function () {
    page.navigateTo();
    expect(page.getAddTodoButton().getText()).toEqual("Add Todo")
  });

  it('should have Your todo item headers', function () {
    page.navigateTo();
    expect(page.getTextOfHomePage()).toEqual('Your Todo Item');
  });

});

describe("AddTodo modal popup", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  })

  it('should go to addTodo pop after clicking addTodo button', function () {
    page.getAddTodoButton().click();
    expect(page.getAddTodoPopupTitle().getText()).toEqual("Add Todo Here");
  });

  it('should have addTodo button on popup', function () {
    expect(page.getSaveButtonOnAddTodoPopup().getText()).toEqual("Save");
  });

})
