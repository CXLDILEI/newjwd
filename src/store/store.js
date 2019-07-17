import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    lat:'',
    lng:'',
    msg:''
  },
  mutations:{
    SetPoint(state,point){
      state.lat = point.lat;
      state.lng = point.lng;
      localStorage.setItem('point',JSON.stringify(point));
    },
    
  },
  actions:{
   
  }
})
















