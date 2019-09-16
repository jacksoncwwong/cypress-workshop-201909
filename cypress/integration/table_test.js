/// <reference types="Cypress" />

context('Table Testing', () => {
  beforeEach(() => {
    cy.visit('test.html')
  })

  it('checking table headers', () => {
    cy.wait(1000); //give the page some time to load properly
    cy.get('thead tr th:first-child').contains('Name'); //jquery style queries for elements
    cy.get('thead tr th:nth-child(2)').contains('Position');
    cy.get('thead tr th:nth-child(3)').contains('Office');
    cy.get('thead tr th:nth-child(4)').contains('Age');
    cy.get('thead tr th:nth-child(5)').contains('Start date');
    cy.get('thead tr th:last-child').contains('Salary');
  })

  it('testing the Next button', () => {
    cy.wait(1000); //give the page some time to load properly
    cy.get('tbody tr:first-child td:first-child').contains('Airi'); //jquery style queries for elements
    cy.get('.paginate_button.next').click();
    cy.get('tbody tr:first-child td:first-child').contains('Charde');
  })

  it('testing the Next button with a loop', () => {
    cy.wait(1000); //give the page some time to load properly
    cy.get('.dataTables_paginate span a:last-child').then(($lastPageBtn) => {
      let lastPageNum = $lastPageBtn.text();

      for(let x=1; x<lastPageNum; x++) {        
        cy.get('.paginate_button.next').click()
        cy.get('.paginate_button.current').contains(x+1);

        // for instances where there's a race condition due to async
        // calls, chain using .then like so:
        // cy.get('.paginate_button.next').click().then(() => {
        //   cy.get('.paginate_button.current').contains(x+1);
        // })
      }
    })
  })

  it('testing pagination fully', () => {
    expect(false).to.equal(true) // this is just here so the test fails
    // Question: is that the best we can do for pagination?
    // the current implementation ensures the pagination nav works
    // but we're not sure if we're showing the right data per page
    // and what if we don't know ahead of time what the data is?

  })

  it('sorting test', () => {
    cy.get('thead tr th').contains('Position').click();
    cy.get('tbody tr:first-child td:nth-child(2)').contains('Accountant');
    cy.get('tbody tr td').contains('Accountant'); 
    // Question: take a look at the step above when inside the test runner, why is this passing? Is this a good test?
    // is this also the best we can do?

    cy.wait(500).then(() => { // this is just here so the test fails
      expect(false).to.equal(true);
    })
  })

})
