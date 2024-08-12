import moment from "moment";
import SwitchButton from 'bootstrap-switch-button-react';
import React, { useState, useEffect,useCallback } from 'react';

import Card from '@mui/material/Card';
import { Container} from '@mui/system';

import Label from 'src/components/label';

import '../../app.css';
import Selection from './selection';





export default function TraficLightsView (){
  const [activeLight1, setActiveLight1] = useState('');
  const [activeLight2, setActiveLight2] = useState('');
  const [activeLight3, setActiveLight3] = useState('');
  const [activeLight4, setActiveLight4] = useState('');
  const [ACV, setACV] = useState('');
  const [ACI, setACI] = useState('');
  const [DCV, setDCV] = useState('');
  const [DCI, setDCI] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [inverterStatus,setInverterStatus]=useState('');
  const [lightStatus,setLightStatus]=useState('');
  const [selectedJunction,setSelectedJunction]=useState(20000);
  const [junctions,setJunctions]=useState([]);

//   const navigate = useNavigate();

  const handleChange = () => {
    setIsChecked(!isChecked);
  };


  const onlineJunction = a => moment().diff(moment.utc((a.lastHeartBeatTime)), 'minute') < 10;
  const onlineInverter = a => moment().diff(moment.utc((a.lastHeartBeatTime)), 'minute') < 10;
  
  const getLightData=useCallback(async()=>{
    fetch('http://gvc.co.in:8080/trafficLights/getLights', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Junction: selectedJunction
      })
    })
    .then(response => response.json())  // Convert the response to JSON
    .then(data => {
      // console.log(data);
      const Data=data[data.length-1];
      // Access properties from the data object
      setActiveLight1(Data.R1);
      setActiveLight2(Data.R2);
      setActiveLight3(Data.R3);
      setActiveLight4(Data.R4);
      if(onlineJunction(Data))
      {
        setLightStatus("Online");
      }
      else{
        setLightStatus("Offline");
      }
    })
    .catch(err => {
      console.log("Error:", err);
    });
    
  },[setActiveLight1,setActiveLight2,setActiveLight3,setActiveLight4,setLightStatus,selectedJunction])

  const getAllJunctions=useCallback(async()=>{
    fetch('http://gvc.co.in:8080/trafficLights/getAllJunstion')
    .then(response => response.json())  // Convert the response to JSON
    .then(data => {
      console.log(data);
      const filteredData = data.map(item => (
        
         item.Junction // Replace 'paramKey' with the actual key you need
      ));
      console.log(filteredData);
      setJunctions(filteredData);
    })
    .catch(err => {
      console.log("Error:", err);
    });
    
  },[setJunctions])

  const fetchInverterStatus = useCallback(async() => {
    fetch('http://gvc.co.in:8080/trafficLights/getInverterStatus', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Junction: selectedJunction
      })
    })
    .then(response => response.json())  // Convert the response to JSON
    .then(data => {
      console.log(data);
      const Data=data[data.length-1]
      setACV(Data.ACV);
      setACI(Data.ACI);
      setDCV(Data.DCV);
      setDCI(Data.DCI);
      if(onlineInverter(Data))
        {
          setInverterStatus("Online");
        }
        else{
          setInverterStatus("Offline");
        }
    })
    .catch(err => {
      console.log("Error:", err);
    //   navigate('/login');
    });
  
  
  },[setInverterStatus,selectedJunction])


  useEffect(() => {
    let interval;
  
    if (!sessionStorage.getItem("token")) {
    //   navigate("/login");
    } else {
      fetchInverterStatus();
      getAllJunctions();
  
      interval = setInterval(() => {
        fetchInverterStatus();
      }, 5000);
    }
  
    return () => clearInterval(interval);
  }, [fetchInverterStatus, getAllJunctions, selectedJunction]);
  

  useEffect(() => {
    let interval;
  
    if (!isChecked) {
      getLightData();
      interval = setInterval(() => {
        getLightData();
        // Check if isChecked has changed to true within the interval callback
        if (isChecked) {
          clearInterval(interval);
        }
       
      }, 5000);
    } else {
      // Clear the interval when isChecked changes to true
      clearInterval(interval);
    
    }
  
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  
  }, [isChecked,getLightData]);  // Dependency array includes isChecked
  

    useEffect(() => {
      if(isChecked && activeLight1.length>0 && activeLight2.length>0 && activeLight3.length>0 && activeLight4.length>0)
      {
      fetch('http://gvc.co.in:8080/trafficLights/setLights',{
        method:'POST',
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          Junction:20000,
          R1:activeLight1,
          R2:activeLight2,
          R3:activeLight3,
          R4:activeLight4
        })
      })
    }
      
    }, [activeLight1,activeLight2,activeLight3,activeLight4,isChecked]);

    const handleClick1=(value)=>{
      if(isChecked)
      {
       setActiveLight1(value);
       setActiveLight2('R');
       setActiveLight3('R');
       setActiveLight4('R');
      }

    }

    const handleClick2=(value)=>{
      if(isChecked)
        {
      setActiveLight2(value);
      setActiveLight1('R');
      setActiveLight3('R');
      setActiveLight4('R');
        }

   }
   const handleClick3=(value)=>{
    if(isChecked)
      {
    setActiveLight3(value);
    setActiveLight1('R');
    setActiveLight2('R');
    setActiveLight4('R');
      }

 }
 const handleClick4=(value)=>{
  if(isChecked)
    {
  setActiveLight4(value);
  setActiveLight1('R');
  setActiveLight2('R');
  setActiveLight3('R');
    }

}



  return (
    <Card>
            <Container maxWidth='xxl'>
    
    <div>
   
      <div style={{width:'100%',height:'100px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{paddingLeft:"30px",marginBottom:'10px'}}>
                    
                             <h5>Select Mode</h5>
                                   <SwitchButton
                              
                                  checked={isChecked}
                                  onChange={handleChange}
                                  onlabel="Server"
                                  offlabel="Auto"
                                  onstyle='success'
                                  offstyle='info'
                                  width={180}
                              />
                    
                  
                  </div>
                  <div>
                  <Selection
                      names={junctions} 
                      selectedJunction={selectedJunction} 
                      setSelectedJunction={setSelectedJunction} 
                    />

                  </div>
                  <div style={{paddingRight:"200px"}}>
                  Status: <Label sx={{width:100, height:40}} color={(lightStatus==="Offline"  && 'error') || 'success'}>{lightStatus}</Label>
                  {/* <h4 className='inverter-stat'>Status : <span className='inverter-value'>{lightStatus}</span></h4>  */}
                  </div>
       </div>

    <div style={{width:'100%',display:'flex',justifyContent:"space-around",gap:"10px"}}>
       <div style={{display:"flex"}}>
            <div className="traffic-light">
            <div role="button" tabIndex={0} onClick={()=>handleClick1("R")}  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { handleClick4("R");} }}className={`light R ${activeLight1 === 'R' ? 'active' : ''}`} />
            <div role="button" tabIndex={0} onClick={()=>handleClick1("A")}  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { handleClick1("A");} }} className={`light A ${activeLight1 === 'A' ? 'active' : ''}`} />
            <div role="button" tabIndex={0}  onClick={()=>handleClick1("G")}  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { handleClick1("G");} }} className={`light G ${activeLight1 === 'G' ? 'active' : ''}`} />
     
            </div>
            <div className="traffic-light">
            <div style={{visibility:'hidden',backgroundColor:"white"}} className={`light G ${activeLight1 === 'G' ? 'active' : ''}`} />
            <div style={{visibility:'hidden',backgroundColor:'white'}}  className={`light G ${activeLight1 === 'G' ? 'active' : ''}`} />
            <div role="button" tabIndex={0} onClick={()=>handleClick1("G")}  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { handleClick1("G");} }} className={`light G ${activeLight1 === 'G' ? 'active' : ''}`} />
          </div>
       </div>
       <div style={{display:"flex"}}>
            <div className="traffic-light">
            <div role="button" tabIndex={0} onClick={()=>handleClick2("R")}  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { handleClick2("R");} }} className={`light R ${activeLight2 === 'R' ? 'active' : ''}`} />
            <div role="button" tabIndex={0} onClick={()=>handleClick2("A")}  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { handleClick2("A");} }} className={`light A ${activeLight2 === 'A' ? 'active' : ''}`} />
            <div role="button" tabIndex={0} onClick={()=>handleClick2("G")}  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { handleClick2("G");} }} className={`light G ${activeLight2 === 'G' ? 'active' : ''}`} />
     
            </div>
            <div className="traffic-light">
            <div style={{visibility:'hidden',backgroundColor:"white"}} className={`light G ${activeLight2 === 'G' ? 'active' : ''}`} />
            <div style={{visibility:'hidden',backgroundColor:'white'}}  className={`light G ${activeLight2 === 'G' ? 'active' : ''}`}/>
            <div role="button" tabIndex={0} onClick={()=>handleClick2("G")}  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { handleClick2("G");} }} className={`light G ${activeLight2 === 'G' ? 'active' : ''}`} />
          </div>
       </div>
     
       <div style={{display:"flex"}}>
            <div className="traffic-light">
            <div role="button" tabIndex={0} onClick={()=>handleClick3("R")}  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { handleClick3("R");} }} className={`light R ${activeLight3 === 'R' ? 'active' : ''}`} />
            <div role="button" tabIndex={0} onClick={()=>handleClick3("A")}  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { handleClick3("A");} }} className={`light A ${activeLight3 === 'A' ? 'active' : ''}`} />
            <div role="button" tabIndex={0} onClick={()=>handleClick3("G")}  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { handleClick3("G");} }} className={`light G ${activeLight3 === 'G' ? 'active' : ''}`} />
     
            </div>
            <div className="traffic-light">
            <div style={{visibility:'hidden',backgroundColor:"white"}} className={`light G ${activeLight3 === 'G' ? 'active' : ''}`}/>
            <div style={{visibility:'hidden',backgroundColor:'white'}}  className={`light G ${activeLight3 === 'G' ? 'active' : ''}`}/>
            <div role="button" tabIndex={0} onClick={()=>handleClick3("G")}  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { handleClick3("G");} }} className={`light G ${activeLight3 === 'G' ? 'active' : ''}`} />
          </div>
       </div>
       <div style={{display:"flex"}}>
            <div className="traffic-light">
            <div role="button" tabIndex={0} onClick={()=>handleClick4("R")}  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { handleClick4("R");} }} className={`light R ${activeLight4 === 'R' ? 'active' : ''}`}/>
            <div role="button" tabIndex={0} onClick={()=>handleClick4("A")}  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { handleClick4("A");} }} className={`light A ${activeLight4 === 'A' ? 'active' : ''}`}/>
            <div role="button"   tabIndex={0} onClick={()=>handleClick4("G")}  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { handleClick4("G");} }} className={`light G ${activeLight4 === 'G' ? 'active' : ''}`}/>
     
            </div>
            <div className="traffic-light">
            <div style={{visibility:'hidden',backgroundColor:"white"}} className={`light G ${activeLight4 === 'G' ? 'active' : ''}`}/>
            <div style={{visibility:'hidden',backgroundColor:'white'}}  className={`light G ${activeLight4 === 'G' ? 'active' : ''}`}/>
            <div role="button" type="button" tabIndex={0}  onClick={()=>handleClick4("G")}  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { handleClick4("G");} }} className={`light G ${activeLight4 === 'G' ? 'active' : ''}`}/>
          </div>
       </div>
    
    </div>
   
    <div className='inverter-container'>
      <h3 className='inverter-heading'>Inverter Status:  <Label sx={{width:100, height:40}} color={(inverterStatus==="Offline"  && 'error') || 'success'}>{inverterStatus}</Label></h3>
      <h4 className='inverter-stat'>ACV : <span className='inverter-value'>{ACV}</span></h4>
      <h4 className='inverter-stat'>ACI : <span className='inverter-value'>{ACI}</span></h4>
      <h4 className='inverter-stat'>DCV : <span className='inverter-value'>{DCV}</span></h4>
      <h4 className='inverter-stat'>DCI : <span className='inverter-value'>{DCI}</span></h4>
    </div>
    </div>
    </Container>
    </Card>
  );
};


