import { browser, by, element } from 'protractor';


export class PeoplePage {
  navigateTo() {
    return browser.get('');
  }

  navigateToPeople() {
    return browser.get('/#/people/1');
  }

  getListOfPeople() {
    return element.all(by.css('.mat-list-item'));
  }

  getSortSelect() {
    return element(by.css('.mat-select'));
  }

  getAllSortOptions(){
    return element.all(by.css('.mat-option'));
  }

  getSortOptions(){
    return element(by.css('.mat-option'));
  }

  getListItem() {
    return element(by.css('.mat-list-item'));
  }

  getOpenModalElement() {
    return element(by.tagName('.dialog-content'));
  }

  getOpenModalHeadingElement() {
    return element(by.css('.dialog-content h1'));
  }

  getCloseButton() {
    return element(by.css('button'));
  }

  getLoader(){
    return element(by.css('#loader'));
  }

  selectPeople() {
    browser.actions().click(this.getListItem());
  }
}