

import { store } from "../Redux/store";
import { saveData } from "../Redux/action";

// const API = import.meta.env.VITE_REACT_SERVER_API;

export const AllMacAddress=async()=> {
  
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });

      const response = await fetch(`http://165.232.180.111:8080/trafficLights/getMacAddress`, { method: 'GET', headers });
      const json = await response.json();
      // console.log(json)
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }

  export const getData=async()=> {
  
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const city=JSON.parse(sessionStorage.getItem("cities"));

      const response = await fetch(`http://165.232.180.111:8080/trafficLights/getData?city=${city.join()}`, { method: 'GET', headers });
      const json = await response.json();

      store.dispatch(saveData(json.data));
      // console.log(json)
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }

  export const getTestMode=async()=> {
  
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`http://165.232.180.111:8080/trafficLights/getTestMode`, { method: 'GET', headers });
      const json = await response.json();
      // console.log(json)
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }

  export const setTestMode=()=>{
  
    fetch(`http://165.232.180.111:8080/trafficLights/setTestMode`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      }
    })
    
  
  }


  export const sendFota=(MacID,fota,port,name,type)=>{
    const obj={
      MacId:MacID,
      outPutValue:true,
      socketNumber:port,
      UserName:name,
      type
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendFota`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
    
  
  }
   
 export const sendReset=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      UserName:name,
      socketNumber:port,
      
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/reset`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  
  export const sendV=(MacID,Pin,Pulse,Port,name)=>{
    const obj={
      MacId:MacID,
      Pin,
      Pulse,
      socketNumber:Port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendV`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  
  export const sendFW=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      UserName:name,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendFW`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  
 export const sendTC=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      UserName:name,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendTC`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  
  export const sendTV=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      UserName:name,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendTV`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendFotaUrl=(MacID,url,port,name)=>{
    const obj={
      MacId:MacID,
      Url:url,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendFotaUrl`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const askUrl=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/askUrl`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendCC=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendCC`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const setSN=(MacID,port,name,SN)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
      SerialNumber:SN
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/setSN`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendPassThru=(MacID,port,name,SN)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
      PassThru:SN
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendPassThru`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const checkPassThru=(MacID,port)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
    
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/checkPassThru`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const setErase=(MacID,port,name,SN)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
      Erase:SN
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/setErase`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const setL=(MacID,port,name,SN)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
      LNumber:SN
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/setL`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const checkErase=(MacID,port)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
    
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/checkErase`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  

  export const checkSN=(MacID,port)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
    
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/checkSN`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const setPair=(MacID,port,name,SN)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
      PairNumber:SN
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/setPair`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const checkPair=(MacID,port)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
    
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/checkPair`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  

  export const sendLight=(MacID,light,position,port,name)=>{
    const obj={
      MacId:MacID,
      light,
      position,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendLight`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendHBT=(MacID,value,port,name)=>{
    const obj={
      MacId:MacID,
      value,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendHBT`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendSIP=(MacID,ip,pin,port,name)=>{
    const obj={
      MacId:MacID,
      Ip:ip,
      Pin:pin,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendSIP`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendSSID=(MacID,SSID,port,name)=>{
    const obj={
      MacId:MacID,
      SSID,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendSSID`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  export const askSSID=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
   
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/askSSID`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  export const sendPWD=(MacID,PWD,port,name)=>{
    const obj={
      MacId:MacID,
      PWD,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendPWD`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendSSID1=(MacID,SSID1,port,name)=>{
    const obj={
      MacId:MacID,
      SSID1,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendSSID1`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  export const sendPWD1=(MacID,PWD1,port,name)=>{
    const obj={
      MacId:MacID,
      PWD1,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendPWD1`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendCA=(MacID,numValue,polarity,port,name)=>{
    const obj={
      MacId:MacID,
      numValue,
      polarity,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendCA`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const askCA=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/askCA`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const askSIP=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/askSIP`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const modeTest1=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/modeTest1`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const modeTest2=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/modeTest2`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const modeTest3=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/modeTest3`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const modeNone=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/modeNone`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }



  export const getAllOutputs=async()=> {
  
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });

      const response = await fetch(`http://165.232.180.111:8080/trafficLightsTesting/getOutPuts`, { method: 'GET', headers });
      const json = await response.json();
      // console.log(json)
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }


  export const sendH1=(MacID,fota,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
       message:"*H1#"
    
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendMessage`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
    
  
  }

  export const sendH2=(MacID,fota,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
       message:"*H2#"
    
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendMessage`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
    
  
  }

  export const sendH3=(MacID,fota,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
       message:"*H3#"
    
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendMessage`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
    
  
  }

  export const sendH4=(MacID,fota,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
      message:"*H4#"
    
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendMessage`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
    
  
  }

  export const sendFLASH=(MacID,fota,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
       message:"*FLASH#"
    
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendMessage`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
    
  
  }

  export const sendOFF=(MacID,fota,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
       message:"*OFF#"
    
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendMessage`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
    
  
  }

  export const sendNEXT=(MacID,fota,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
      message:"*NEXT#"
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendMessage`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
    
  
  }

  export const sendAUTO=(MacID,fota,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
      message:"*AUTO#"
    
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendMessage`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
    
  
  }

  export const askQ=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
      message:"*Q?#"
  
    }
    fetch(`http://165.232.180.111:8080/trafficLights/sendMessage`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

