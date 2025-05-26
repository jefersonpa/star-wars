/// <reference types="cypress" />
import { generatedCodeApi } from '../../../services/generatedCodeApi';
import { store } from '../../../store/store';
import { TestHarness } from '../../../TestHarness';
import SearchInput from './SearchInput';

beforeEach(() => {
  store.dispatch(generatedCodeApi.util.resetApiState());
});

describe('GIVEN the user open the search page', () => {
  context('WHEN the use click on movies combo', () => {
    it('THEN the selected combo is the movies ', () => {
      cy.mount(
        <TestHarness>
          <SearchInput />
        </TestHarness>,
      );
      cy.get('[data-testid="search-combo-people"]').click();
      cy.get('[data-testid="search-combo-movies"]').click();
      cy.get('[data-testid="search-combo-people"]').should('not.have.class', 'search-input__ellipse-selected');
      cy.get('[data-testid="search-combo-movies"]').should('have.class', 'search-input__ellipse-selected');
    });
  });

  context('WHEN the use click on people combo', () => {
    it('THEN the selected combo is the movies ', () => {
      cy.mount(
        <TestHarness>
          <SearchInput />
        </TestHarness>,
      );
      cy.get('[data-testid="search-combo-movies"]').click();
      cy.get('[data-testid="search-combo-people"]').click();
      cy.get('[data-testid="search-combo-people"]').should('have.class', 'search-input__ellipse-selected');
      cy.get('[data-testid="search-combo-movies"]').should('not.have.class', 'search-input__ellipse-selected');
    });
  });

  context('WHEN the search is empty', () => {
    it('THEN the button is disabled', () => {
      cy.mount(
        <TestHarness>
          <SearchInput />
        </TestHarness>,
      );
      cy.contains('button', 'SEARCH').should('have.class', 'search-input__search-button-disabled');
      cy.contains('button', 'SEARCH').should('be.disabled');
    });
  });
  context('WHEN the combo is people and the user click on the search button', () => {
    it('THEN the button change to loading and disabled', () => {
      cy.mount(
        <TestHarness>
          <SearchInput />
        </TestHarness>,
      );
      cy.get('[data-testid="search-combo-people"]').click({ force: true });
      cy.get('[data-testid="search-input"]').type('a');
      cy.contains('button', 'SEARCH').click({ force: true });
      cy.intercept('**/star-wars/people*', { delay: 200 }).as('get-starwars-people');
      cy.contains('button', 'SEARCHING...').should('have.class', 'search-input__search-button-disabled');
      cy.contains('button', 'SEARCHING...').should('be.disabled');
    });
  });
  context('WHEN the combo is movies and the user click on the search button', () => {
    it('THEN the button change to loading and disabled', () => {
      cy.mount(
        <TestHarness>
          <SearchInput />
        </TestHarness>,
      );
      cy.get('[data-testid="search-combo-movies"]').click({ force: true });
      cy.get('[data-testid="search-input"]').type('a');
      cy.contains('button', 'SEARCH').click({ force: true });
      cy.intercept('**/star-wars/movies*', { delay: 200 }).as('get-starwars-movies');
      cy.contains('button', 'SEARCHING...').should('have.class', 'search-input__search-button-disabled');
      cy.contains('button', 'SEARCHING...').should('be.disabled');
    });
  });
});
