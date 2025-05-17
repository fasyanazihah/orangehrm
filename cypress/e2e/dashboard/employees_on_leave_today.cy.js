import DashboardPage from "../../pages/dashboard_page.js"

describe("Employees on Leave Today",()=>{
    let userData
            
    before(()=>{
        DashboardPage.loadUserData().then((data)=>userData=data)
    })
        
    beforeEach(()=>{
        DashboardPage.initialize(userData)
    })

    it("Configurations Active",()=>{
        DashboardPage.configurationActive()
    })

    it("Configurations Inactive",()=>{
        DashboardPage.configurationInactive()
    })

    it("Configurations Canceled",()=>{
        DashboardPage.configurationCanceled()
    })
})
