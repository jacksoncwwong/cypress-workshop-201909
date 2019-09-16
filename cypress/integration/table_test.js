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
        cy.get('.paginate_button.next').click().then(() => {
          cy.get('.paginate_button.current').contains(x+1);
        })
      }
    })
  })

  // it('testing pagination with an array', () => {
  //   let bigList = [];

  //   for(let x=1; x<=10; x++) {
  //     cy.get('tbody tr:nth-child(' + x + ') td:first-child').then(($name) => {
  //       // $name is the object that the previous command yielded
  //       let name = $name.text();
  //       bigList.push(name);

  //     })
  //   }

  //   cy.log(bigList);

  //   cy.get('.paginate_button.next').click()
  // })
})
