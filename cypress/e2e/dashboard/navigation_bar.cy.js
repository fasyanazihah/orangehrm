import DashboardPage from "../../pages/dashboard_page.js"

const navigationMenu = require("./../../fixtures/navigation_menu.json")

describe("Navigation Bar",()=>{
    let userData
                
    before(()=>DashboardPage.loadUserData().then((data)=>userData=data))
            
    beforeEach(()=>DashboardPage.initialize(userData))

    navigationMenu.forEach((navigation,index) => it("Menu " + navigation.name,() => DashboardPage.validateNavigationMenu(index,navigation)))
})