import LoginPage from "./../pages/login_page.js"

class DashboardPage {
    loadUserData(){
        return cy.fixture("user_data")
    }

    loadSidebarMenu(){
        return cy.fixture("sidebar_menu")
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
        cy.url().should('include', 'viewBuzz')
        cy.wait(3000)
    }

    validateDataPost (){
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/buzz/feed?limit=5&offset=0&sortOrder=DESC&sortField=share.createdAtUtc').as('getBuzzList')
        cy.wait('@getBuzzList').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
            expect(response.body.data).to.have.length.lessThan(6)
        })
    }

    viewDetailAttendance (){
        cy.selector('.orangehrm-attendance-card-bar > .oxd-icon-button > .oxd-icon').click()
        cy.url().should('include', '/attendance/')
        cy.wait(3000)
    }

    viewTimeWork (){
        cy.reload()
        cy.intercept('GET', "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/time-at-work?**").as('getTimeWork')
        cy.wait('@getTimeWork').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
        })
    }

    viewPendingSelfReview (){
        cy.selector('.orangehrm-todo-list > :nth-child(1) > .oxd-text').click()
        cy.url().should('include', '/performance/')
        cy.wait(3000)
    }

    viewCandidateToReview (){
        cy.selector('.orangehrm-todo-list > :nth-child(2) > .oxd-text').click()
        cy.url().should('include', '/recruitment/')
        cy.wait(3000)
    }

    getListActionSummary (){
        cy.intercept('GET',"https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary").as('getActionSummary')
        cy.wait('@getActionSummary').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
        })
    }
    
    assignLeave (){
        cy.selector('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(1) > .oxd-icon-button').click()
        cy.url().should('include', 'assignLeave')
        cy.wait(3000)
    }

    leaveList (){
        cy.selector('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(2) > .oxd-icon-button').click()
        cy.url().should('include', 'viewLeaveList')
        cy.wait(3000)
    }

    timesheets (){
        cy.selector('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(3) > .oxd-icon-button').click()
        cy.url().should('include', 'viewEmployeeTimesheet')
        cy.wait(3000)
    }

    applyLeave (){
        cy.selector('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(4) > .oxd-icon-button').click()
        cy.url().should('include', 'applyLeave')
        cy.wait(3000)
    }

    myLeave (){
        cy.selector('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(5) > .oxd-icon-button').click()
        cy.url().should('include', 'viewMyLeaveList')
        cy.wait(3000)
    }

    myTimesheet (){
        cy.selector('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(6) > .oxd-icon-button').click()
        cy.url().should('include', 'viewMyTimesheet')
        cy.wait(3000)
    }

    getQuickLaunch (){
        cy.intercept('GET',"https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts").as('getQuickLaunch')
        cy.wait('@getQuickLaunch').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
        })
    }

    configurationActive (){
        cy.selector('.bi-gear-fill').click()
        cy.selector('.oxd-switch-input')
        cy.selector('.oxd-switch-input').click()
        cy.selector('.oxd-button--secondary').click()
    }

    configurationInactive (){
        cy.selector('.bi-gear-fill')
        cy.selector('.oxd-switch-input')
        cy.selector('.oxd-button--secondary').click()
    }

    configurationCanceled (){
        cy.selector('.bi-gear-fill')
        cy.selector('.oxd-switch-input')
        cy.selector('.oxd-button--ghost').click()
    }

    getLeaves (){
        cy.intercept('GET',"https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/leaves?date=2025-05-17").as('getLeaves')
        cy.wait('@getLeaves').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
        })
    }

    validateSidebarMenu(index,sidebar){
        cy.selector(`:nth-child(${index+1}) > .oxd-main-menu-item`).click()
        cy.url().should('include', sidebar.url)
        cy.wait(3000)
    }
}

export default new DashboardPage()