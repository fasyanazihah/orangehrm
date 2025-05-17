 import DashboardPage from "../../pages/dashboard_page.js"

describe("Quick Launch",()=>{
    let userData
        
    before(()=>{
        DashboardPage.loadUserData().then((data)=>userData=data)
    })
        
    beforeEach(()=>{
        DashboardPage.initialize(userData)
    })

    it("Assign Leave",()=>{
        DashboardPage.assignLeave()
    })

    it("Leave List",()=>{
        DashboardPage.leaveList()
    })

    it("Timesheets",()=>{
        DashboardPage.timesheets()
    })

    it("Apply Leave",()=>{
        DashboardPage.applyLeave()
    })

    it("My Leave",()=>{
        DashboardPage.myLeave()
    })

    it("My Timesheet",()=>{
        DashboardPage.myTimesheet()
    })

    it("Get Quick Launch",()=>{
        DashboardPage.getQuickLaunch()
    })
})