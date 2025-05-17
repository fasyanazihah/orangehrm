import LoginPage from "./../pages/login_page.js"

class DashboardPage {
    loadUserData(){
        return cy.fixture("user_data")
    }
    
    initialize(userData){
        cy.visit("/auth/login")
        LoginPage.perform(userData.validUser.username,userData.validUser.password)
        LoginPage.validateSuccessLogin()
    }

    scrollListPost (){
        cy.wait(1000)
        cy.selector(':nth-child(4) > .oxd-sheet').scrollIntoView({ behavior: 'smooth'}).then($el => cy.window().then(win => win.scrollTo(0, win.scrollY - 150)))
        cy.wait(1000)
        cy.selector(':nth-child(4) > .oxd-sheet > .orangehrm-dashboard-widget-body').then($el => expect($el[0].scrollHeight > $el[0].clientHeight).to.be.true)
        cy.selector(':nth-child(4) > .oxd-sheet > .orangehrm-dashboard-widget-body').scrollTo('bottom',{duration: 1000})
        cy.wait(1000)
        cy.selector(':nth-child(4) > .oxd-sheet > .orangehrm-dashboard-widget-body').scrollTo('top',{duration: 1000})
    }

    viewProfilePostUser (){
        cy.selector(':nth-child(1) > .orangehrm-buzz-widget-header').click()
        cy.selector('.orangehrm-buzz-newsfeed > .oxd-text--card-title').should('be.visible')
        cy.url().should('include', 'viewBuzz')
    }

    validateDataPost (){
          cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/buzz/feed?limit=5&offset=0&sortOrder=DESC&sortField=share.createdAtUtc').as('getBuzzList');
            cy.wait('@getBuzzList').then(({ response }) => {
            expect(response.statusCode).to.eq(200);
            expect(response.body.data).to.have.length.lessThan(6);
        });
    }


}

export default new DashboardPage()