import DashboardPage from "../../pages/dashboard_page.js"

describe("Employee Distribution by Sub Unit",()=>{
    let userData
    
    before(()=>{
        DashboardPage.loadUserData().then((data)=>userData=data)
    })
    beforeEach(()=>{
        DashboardPage.initialize(userData)
    })

    it("Validate Enable/Disable Label Chart",()=>{
        DashboardPage.validateLabelChart(
            ':nth-child(6) > .oxd-sheet > .orangehrm-dashboard-widget-body > .emp-distrib-chart > .oxd-chart-legend > :nth-child(1) > .oxd-text',
            ':nth-child(6) > .oxd-sheet > .orangehrm-dashboard-widget-body > .emp-distrib-chart > .oxd-chart-legend > :nth-child(2) > .oxd-text'
        )
    })
    it("Get Employee Dustribution by Sub Unit",()=>{
        DashboardPage.getEmployeeDistributionBySubUnit()
    })
})