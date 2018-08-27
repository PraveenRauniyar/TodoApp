import { browser, by, element } from 'protractor';
import {e} from '@angular/core/src/render3';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getTextOfHomePage() {
    return element(by.css('app-modal h2')).getText();
  }

  getAddTodoButton() {
    return element(by.className('btn btn-lg btn-outline-primary'));
  }

  getAddTodoPopupTitle() {
    return element(by.className('modal-title'));
  }

  getSaveButtonOnAddTodoPopup() {
    return element(by.className('btn btn-outline-dark'));
  }
}
