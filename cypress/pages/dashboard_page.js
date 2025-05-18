import { timeout } from "async"
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
        cy.get(':nth-child(4) > .oxd-sheet > .orangehrm-dashboard-widget-body').then($el => expect($el[0].scrollHeight > $el[0].clientHeight).to.be.true)
        cy.get(':nth-child(4) > .oxd-sheet > .orangehrm-dashboard-widget-body').scrollTo('bottom',{duration: 1000})
        cy.wait(1000)
        cy.get(':nth-child(4) > .oxd-sheet > .orangehrm-dashboard-widget-body').scrollTo('top',{duration: 1000})
    }

    viewProfilePostUser (){
        cy.get(':nth-child(1) > .orangehrm-buzz-widget-header').click()
        cy.url().should('include', 'viewBuzz')
        cy.wait(3000)
    }

    validateDataPost (){
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/buzz/feed?limit=5&offset=0&sortOrder=DESC&sortField=share.createdAtUtc').as('getBuzzList')
        cy.reload()
        cy.wait('@getBuzzList',{timeout:Number.MAX_SAFE_INTEGER}).then(({ response }) => {
            expect(response.statusCode).to.eq(200)
            expect(response.body.data).to.have.length.lessThan(6)
        })
    }

    viewDetailAttendance (){
        cy.get('.orangehrm-attendance-card-bar > .oxd-icon-button > .oxd-icon').click()
        cy.url().should('include', '/attendance/')
        cy.wait(3000)
    }

    viewTimeWork (){
        cy.intercept('GET', "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/time-at-work?**").as('getTimeWork')
        cy.reload()
        cy.wait('@getTimeWork',{timeout:Number.MAX_SAFE_INTEGER}).then(({ response }) => {
            expect(response.statusCode).to.eq(200)
        })
    }

    viewPendingSelfReview (){
        cy.get('.orangehrm-todo-list > :nth-child(1) > .oxd-text').click()
        cy.url().should('include', '/performance/')
        cy.wait(3000)
    }

    viewCandidateToReview (){
        cy.get('.orangehrm-todo-list > :nth-child(2) > .oxd-text').click()
        cy.url().should('include', '/recruitment/')
        cy.wait(3000)
    }

    getListActionSummary (){
        cy.intercept('GET',"https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary").as('getActionSummary')
        cy.reload()
        cy.wait('@getActionSummary',{timeout:Number.MAX_SAFE_INTEGER}).then(({ response }) => {
            expect(response.statusCode).to.eq(200)
        })
    }
    
    assignLeave (){
        cy.get('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(1) > .oxd-icon-button').click()
        cy.url().should('include', 'assignLeave')
        cy.wait(3000)
    }

    leaveList (){
        cy.get('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(2) > .oxd-icon-button').click()
        cy.url().should('include', 'viewLeaveList')
        cy.wait(3000)
    }

    timesheets (){
        cy.get('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(3) > .oxd-icon-button').click()
        cy.url().should('include', 'viewEmployeeTimesheet')
        cy.wait(3000)
    }

    applyLeave (){
        cy.get('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(4) > .oxd-icon-button').click()
        cy.url().should('include', 'applyLeave')
        cy.wait(3000)
    }

    myLeave (){
        cy.get('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(5) > .oxd-icon-button').click()
        cy.url().should('include', 'viewMyLeaveList')
        cy.wait(3000)
    }

    myTimesheet (){
        cy.get('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(6) > .oxd-icon-button').click()
        cy.url().should('include', 'viewMyTimesheet')
        cy.wait(3000)
    }

    getQuickLaunch (){
        cy.intercept('GET',"https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts").as('getQuickLaunch')
        cy.reload()
        cy.wait('@getQuickLaunch',{timeout:Number.MAX_SAFE_INTEGER}).then(({ response }) => {
            expect(response.statusCode).to.eq(200)
        })
    }

    configurationActive (){
        cy.get('.bi-gear-fill').click()
        cy.get('.oxd-switch-input').should("be.visible")
        cy.get('.oxd-switch-input').click()
        cy.get('.oxd-button--secondary').click()
    }

    configurationInactive (){
        cy.get('.bi-gear-fill').click()
        cy.get('.oxd-switch-input').should("be.visible")
        cy.get('.oxd-switch-input').click()
        cy.get('.oxd-button--secondary').click()
    }

    configurationCanceled (){
        cy.get('.bi-gear-fill').click()
        cy.get('.oxd-switch-input').should("be.visible")
        cy.get('.oxd-button--ghost').click()
    }

    getLeaves (){
        cy.intercept('GET',"https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/leaves?date=2025-05-17").as('getLeaves')
        cy.reload()
        cy.wait('@getLeaves',{timeout:Number.MAX_SAFE_INTEGER}).then(({ response }) => {
            expect(response.statusCode).to.eq(200)
        })
    }

    validateSidebarMenu(index,sidebar){
        cy.get(`:nth-child(${index+1}) > .oxd-main-menu-item`).click()
        cy.url().should('include', sidebar.url)
        cy.wait(3000)
    }

    validateNavigationMenu(index,navigation){
        cy.get('.oxd-userdropdown-tab').click()
        cy.get(`:nth-child(${index+1}) > .oxd-userdropdown-link`).click()
        if(navigation.url) cy.url().should('include', navigation.url)
        cy.wait(3000)
    }

    validateLabelChart(label){
        cy.get(label).invoke('attr', 'style').should('not.exist')
        cy.get(label).click()
        cy.get(label).invoke('attr', 'style').should('exist')
    }

    getEmployeeDistributionBySubUnit(){
        cy.intercept('GET',"https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/subunit").as('EmployeeDistributionBySubUnit')
        cy.reload()
        cy.wait('@EmployeeDistributionBySubUnit',{timeout:Number.MAX_SAFE_INTEGER}).then(({ response }) => {
            expect(response.statusCode).to.eq(200)
        })
    }

    getEmployeeDistributionByLocation(){
        cy.intercept('GET',"https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/locations").as('EmployeeDistributionByLocation')
        cy.reload()
        cy.wait('@EmployeeDistributionByLocation',{timeout:Number.MAX_SAFE_INTEGER}).then(({ response }) => {
            expect(response.statusCode).to.eq(200)
        })
    }
}

export default new DashboardPage()