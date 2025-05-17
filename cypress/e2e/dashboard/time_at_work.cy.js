import DashboardPage from "../../pages/dashboard_page.js"

describe("Time at Work",()=>{
let userData
    before(()=>{
        DashboardPage.loadUserData().then((data)=>userData=data)
    })
    
    beforeEach(()=>{
        DashboardPage.initialize(userData)
    })

    // it("View Detail Attendance",()=>{
    //     DashboardPage.viewDetailAttendance()
    // })

    it("View Time Work",()=>{
        DashboardPage.viewTimeWork()
    })
})