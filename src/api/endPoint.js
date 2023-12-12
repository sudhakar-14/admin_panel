export const API = {
    currentEnv: "qa",
  
    baseUrls: {
      dev: "http://localhost:3000/",
      qa: "https://oceanhub.herokuapp.com/",
    },

    authUrls: {
        user_list: 'admin/user_list',
        boat_user_list : 'admin/boat_user_list',
        boat_list: 'admin/boatList',
        boat_details: 'admin/boat_details',
        verified_boat_details: 'admin/verified_boat_details',
        user_blocked: 'admin/user_blocked'
    }
}