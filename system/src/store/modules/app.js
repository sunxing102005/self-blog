import Cookie from 'js-cookie'
import {constRout} from '@/router'
const config ={
  state:{
    sidebar:{
      collapse:true

    },
      constRout:constRout
  },
  mutations:{
    toggleSideBar(state){
      if(state.sidebar.collapse){
        Cookie.set('sidebarCollapse',1);
      }else{
        Cookie.set('sidebarCollapse',0);
      }
      state.sidebar.collapse =!state.sidebar.collapse;
    }
  }
}
export default config
