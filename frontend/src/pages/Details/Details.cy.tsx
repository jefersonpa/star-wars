/// <reference types="cypress" />
import { generatedCodeApi } from '../../services/generatedCodeApi';
import { TestHarness } from '../../TestHarness';
import { setSearchBy } from '../../store/sharedSlice';
import Details from './Details';
import { store } from '../../store/store';

beforeEach(() => {
  store.dispatch(generatedCodeApi.util.resetApiState());
});

describe('GIVEN the user open the details page for people', () => {
  context('WHEN the page renders', () => {
    it('THEN the page display a loading message ', () => {
      store.dispatch(setSearchBy('people'));
      cy.mount(
        <TestHarness>
          <Details />
        </TestHarness>,
      );
      cy.contains('Loading...');
    });
  });
});

describe('GIVEN the user open the results page for movies', () => {
  context('WHEN the page renders', () => {
    it('THEN the page display a no matches message ', () => {
      store.dispatch(setSearchBy('movies'));
      cy.mount(
        <TestHarness>
          <Details />
        </TestHarness>,
      );
      cy.contains('Loading...');
    });
  });
});
