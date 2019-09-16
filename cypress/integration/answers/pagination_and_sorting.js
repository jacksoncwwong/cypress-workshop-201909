/// <reference types="Cypress" />

context('Detailed Pagination and Sorting Tests', () => {
  beforeEach(() => {
    cy.visit('test.html')
  })

  it('testing pagination while sorting for Name, with an array', () => {
    // To "fully" test pagination we need to make sure the table contents
    // are "correct". To do that we need to know ALL of the
    // data to know what should show up on each page.
    // For this scenario, I know that the the table loads with the Names column
    // sorted, so I will make an array called bigList, I will go on each
    // page and grab each entry one by one and insert into bigList. Once
    // finished I will make a new list called verficationList, 
    // (careful not to just make verificationList = bigList, why?) and then
    // I will grab copy all those entries into verificationList, sort it, and compare
    // against bigList.
    // If test pass, the test proves the following:
    // - all the entries were in the right order (since the arrays match)
    // - sorting by name in the ascending order is correct (since we sorted separately and it matches)
    
    // Issues:
    // - this assumes 10 item per page, if user changes that the test is wrong, how to fix?
    // - we're not checking total entries, and seeing if we're missing any after sorting (low risk but might as well)
    // - there's probably more I just can't think of any right now

    cy.wait(1000);
    let bigList = [];

    cy.get('.dataTables_paginate span a:last-child').then(($lastPageBtn) => {
      let lastPageNum = $lastPageBtn.text();

      for(let x=1; x<=lastPageNum; x++) { // Question: I had to make x<=lastPageNum instead of x<lastPageNum, why is that?
        for(let j=1; j<=10; j++) { // Question: double loop, why do we need that?
          cy.get('body').then(($body) => {
            if ($body.find('tbody tr:nth-child(' + j + ') td:first-child').length) {
              cy.log('tbody tr:nth-child(' + j + ') td:first-child');
              cy.get('tbody tr:nth-child(' + j + ') td:first-child').then(($name) => {
                // $name is the object that the previous command yielded
                let name = $name.text();
                bigList.push(name);
              })
            }
          })
        }

        if(x<lastPageNum) { // click Next except on the last page
          cy.get('.paginate_button.next').click()
          cy.get('.paginate_button.current').contains(x+1);
        }
      }
    }).then(() => {
      cy.log(bigList); //puts out the list for us to observe

      let verificationList = new Array();

      for(let i=0; i<bigList.length; i++) {
        verificationList[i] = bigList[i];
      }

      verificationList.sort();
      expect(bigList).to.deep.equal(verificationList)
    })
  })

  it('reversing the array to cause failure', () => {
    // just to show that the assertion isn't passing everything
    cy.wait(1000);
    let bigList = [];

    cy.get('thead tr th').contains('Name').click();

    cy.get('.dataTables_paginate span a:last-child').then(($lastPageBtn) => {
      let lastPageNum = $lastPageBtn.text();

      for(let x=1; x<=lastPageNum; x++) { 
        for(let j=1; j<=10; j++) { 
          cy.get('body').then(($body) => {
            if ($body.find('tbody tr:nth-child(' + j + ') td:first-child').length) {
              cy.log('tbody tr:nth-child(' + j + ') td:first-child');
              cy.get('tbody tr:nth-child(' + j + ') td:first-child').then(($name) => {
        
                let name = $name.text();
                bigList.push(name);
              })
            }
          })
        }

        if(x<lastPageNum) { 
          cy.get('.paginate_button.next').click()
          cy.get('.paginate_button.current').contains(x+1);
        }
      }
    }).then(() => {
      cy.log(bigList);

      let verificationList = new Array();

      for(let i=0; i<bigList.length; i++) {
        verificationList[i] = bigList[i];
      }

      verificationList.sort();
      expect(bigList).to.deep.equal(verificationList)
    })
  })

  it('now test all the columns for sorting', () => {
    expect(false).to.equal(true)
    // ok so if we're going to do this for every column
    // the code becomes very repetitive, we're using the same
    // idea, same methodology, but different values, how do we abstract
    // this into a function instead?
  })
})
