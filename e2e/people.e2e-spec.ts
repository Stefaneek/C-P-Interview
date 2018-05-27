import { enableProdMode } from '@angular/core';
import { browser } from 'protractor';

import { PeoplePage } from './people-page.po';


function sleep() {
    browser.sleep(1000); // sleep for demonstration reasons
}

describe('Main Component viw', function () {
    let page: PeoplePage;
    enableProdMode();

    beforeEach(() => {
        page = new PeoplePage();
    });


    it('as a user I can display list of people', () => {
        browser.ignoreSynchronization = true;
        page.navigateTo();
        browser.sleep(1400);
        expect(page.getListOfPeople().count()).toBe(20);
    });

    it('as a user I should see loading indicator when data is loading', () => {
        browser.ignoreSynchronization = true;
        page.navigateTo().then(() => {
            expect(page.getLoader()).toBeTruthy();
        });
    });

    it('as a user I can open dialog with person details', () => {
        page.navigateTo();
        browser.sleep(1400);
        page.getListItem().click();
        browser.sleep(1400);
        expect(page.getOpenModalHeadingElement().getText()).toBe('People profile');
    });

    it('as a user I can close dialog with person details', () => {
        page.navigateToPeople().then(() => {
            page.getCloseButton().click()
            expect(page.getOpenModalElement()).toBeFalsy();
        })
    });

    it('as a user I should be able to access person details by entering URL', () => {
        page.navigateToPeople();
        browser.sleep(1400);
        expect(page.getOpenModalElement()).toBeTruthy();
    });

    it('as a user I can sort users by last name', () => {
        page.navigateTo();
        browser.sleep(1400);
        page.getSortSelect().click().then(() => {
            browser.sleep(1400);
        }).then(() => {
            page.getSortOptions().click();
            browser.sleep(1400);
        });
    });
});
