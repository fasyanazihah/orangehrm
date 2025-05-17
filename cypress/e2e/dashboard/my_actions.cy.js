import DashboardPage from "../../pages/dashboard_page.js"

describe("My Actions",()=>{
    let userData
    
    before(()=>{
        DashboardPage.loadUserData().then((data)=>userData=data)
    })
    
    beforeEach(()=>{
        DashboardPage.initialize(userData)
    })

    it("View Pending Self Review",()=>{ 
        DashboardPage.viewPendingSelfReview()
    })

    it("View Candidate to Review",()=>{
        DashboardPage.viewCandidateToReview()
    })

    it("Get List Action Summary",()=>{
        DashboardPage.getListActionSummary()
    })
})