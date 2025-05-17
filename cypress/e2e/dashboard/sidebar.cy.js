import DashboardPage from "../../pages/dashboard_page.js"

const sidebarMenu = require("./../../fixtures/sidebar_menu.json")

describe("Sidebar",()=>{
    let userData
                
    before(()=>DashboardPage.loadUserData().then((data)=>userData=data))
            
    beforeEach(()=>DashboardPage.initialize(userData))

    sidebarMenu.forEach((sidebar,index) => it("Menu " + sidebar.name,() => DashboardPage.validateSidebarMenu(index,sidebar)))
})