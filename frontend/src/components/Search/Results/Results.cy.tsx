/// <reference types="cypress" />

import { generatedCodeApi } from '../../../services/generatedCodeApi';
import { store } from '../../../store/store';
import { TestHarness } from '../../../TestHarness';
import { setSearchBy, setSearchTerm } from '../../../store/sharedSlice';
import Results from './Results';

beforeEach(() => {
  store.dispatch(generatedCodeApi.util.resetApiState());
});

describe('GIVEN the user open the results page for people', () => {
  context('WHEN the page renders', () => {
    it('THEN the page display a no matches message ', () => {
      cy.intercept('**/star-wars/people*', { body: [], delay: 200 }).as('get-starwars-people');

      cy.mount(
        <TestHarness>
          <Results />
        </TestHarness>,
      );
      store.dispatch(setSearchBy('people'));
      cy.contains('There are zero matches.');
      cy.contains('Use the form to search for People or Movies.');
    });
  });
  context('WHEN the user search for something', () => {
    it('THEN the page display a Searching... message ', () => {
      cy.intercept('**/star-wars/people*', { body: [{ name: 'boat', uid: '1' }], delay: 200 }).as(
        'get-starwars-people',
      );
      cy.mount(
        <TestHarness>
          <Results />
        </TestHarness>,
      );
      store.dispatch(setSearchBy('people'));
      store.dispatch(setSearchTerm('a'));
      cy.contains('Searching...');
    });
  });
  context('WHEN the user search for something', () => {
    it('THEN the page display the name and a button ', () => {
      cy.intercept('**/star-wars/people*', [{ name: 'boat', uid: '1' }]).as('get-starwars-people');
      cy.mount(
        <TestHarness>
          <Results />
        </TestHarness>,
      );
      cy.contains('boat');
      cy.contains('SEE DETAILS');
      cy.wait('@get-starwars-people');
    });
  });
});

describe('GIVEN the user open the results page for movies', () => {
  context('WHEN the page renders', () => {
    it('THEN the page display a no matches message ', () => {
      cy.intercept('**/star-wars/movies*', []).as('get-starwars-movies');
      cy.mount(
        <TestHarness>
          <Results />
        </TestHarness>,
      );
      store.dispatch(setSearchTerm(''));
      store.dispatch(setSearchBy('movies'));
      cy.contains('There are zero matches.');
      cy.contains('Use the form to search for People or Movies.');
    });
  });
  context('WHEN the user search for something', () => {
    it('THEN the page display a Searching... message ', () => {
      cy.intercept('**/star-wars/movies*', { body: [], delay: 200 }).as('get-starwars-movies');
      cy.mount(
        <TestHarness>
          <Results />
        </TestHarness>,
      );
      store.dispatch(setSearchBy('movies'));
      store.dispatch(setSearchTerm('a'));
      cy.contains('Searching...');
    });
  });
  context('WHEN the user search for something', () => {
    it('THEN the page display the title and a button ', () => {
      store.dispatch(setSearchBy('movies'));
      store.dispatch(setSearchTerm('a'));
      cy.intercept('**/star-wars/movies*', [{ title: 'boat2', uid: '2' }]).as('get-starwars-movies');
      cy.mount(
        <TestHarness>
          <Results />
        </TestHarness>,
      );
      cy.contains('boat2');
      cy.contains('SEE DETAILS');
      cy.wait('@get-starwars-movies');
    });
  });
});
