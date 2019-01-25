import {confirmUpload} from '@/api/table'

const config={
  state:{},
  mutations:{

  },
  actions:{
    ConfirmUpload({commit},file){
      return new Promise((resolve,reject)=>{
        confirmUpload(file).then((response)=>{
          if(response.flag){
            resolve(response);
          }else{
            reject('insert sql error !');
          }
        }).catch((e)=>{
          reject(e);
        })
      })
    }
  }
}
export default config;
