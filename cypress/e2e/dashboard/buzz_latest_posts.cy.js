import DashboardPage from "../../pages/dashboard_page.js"

describe("Buzz Latest Posts",()=>{
    let userData

    before(()=>{
        DashboardPage.loadUserData().then((data)=>userData=data)
    })
    beforeEach(()=>{
        DashboardPage.initialize(userData)
    })

    it("Scroll List Post",()=>{
        DashboardPage.scrollListPost()
    })

    it("View Profile Post User",()=>{
        DashboardPage.viewProfilePostUser()
    })

    it("Validate Data Post",()=>{
       DashboardPage.validateDataPost()
    })
})