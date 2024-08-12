import L from 'leaflet';
import moment from 'moment';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import React, { useEffect,useCallback} from 'react';

 // Import Leaflet CSS

import Card from '@mui/material/Card';
import { Container } from '@mui/system';
// import {fetchData} from "../../_mock/machineData";

let map;
export default function Map({center,locations,MachineType}){
 

//    const amountText = amt => {
//     amt = amt || 0;
 
//     if(amt>=10000000) {
//         const cr = parseInt(amt / 100000, 10) / 100;
//         const Cr = parseFloat(cr.toFixed(2));
//         return `${Cr} Cr`;
//     } 
//     if(amt>=1000000) {
//         const l = parseInt(amt / 1000 ,10) / 100;
//         const Lak = parseFloat(l.toFixed(6));
//         return  `${Lak} L`;
//     } 
//     if(amt>=1000) {
//         const k = parseInt(amt / 10 ,10) / 100;
//         const K = parseFloat(k.toFixed(2));
//         return  `${K} K`;
//     }

//     // Remove the unnecessary else statement
//     return amt;

// }



//   const loadMap=()=>{
   
//     // Function to format amount text
 

//   }




  const loadMap = useCallback(() => {
      
  //  console.log(locations);
   let Length = 0;
   const locationsData = sessionStorage.getItem("Locations");
   const locationsArray=JSON.parse(locationsData);
   
   if (locationsData) {
    if (Array.isArray(locationsArray)) {
      Length = locationsArray.length;
    
    } else {
      console.error("Data in 'Locations' is not a valid array:", locationsArray);
    }

    if(locations.length=== Length){
        console.log(locations.length ,Length)
        if (map) {
          // Remove existing map and its container
          map.remove();
         
        }
   
    }
  
   
    
   } else {
     console.log("No data found in 'Locations' key.");
   }

//    if(locations.length!== Length){
//     if (map) {
//    // Remove existing map and its container
//    map.remove();
  
//  }

// }
  
    sessionStorage.setItem("Locations",JSON.stringify(locations));
   map = L.map('map', {
     center,
     zoom: 9,
     scrollWheelZoom: false  // Disable scroll wheel zoom
   });
 
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);
 
   const bounds = calculateBounds(center, locations);
   map.fitBounds(bounds);
 
   locations.forEach(location => {
    //  let Status;
     let StatusLight;
     let StatusInverter;
     const st=moment().diff(moment.utc((location.data.lastHeartBeatTime || location.data.lastOnTime).replace('Z', '')), 'minute') < 5;
     const stLight=location.data.light_status==="Online";
     const stInverter=location.data.inverter_status==="Online";;
     if(stLight && stInverter)
     {
        
         StatusLight="Online";
         StatusInverter="Online";
     }
     else if(stInverter)
     {
      StatusInverter="Online";
      StatusLight="Offline";
     }
     else if(stLight)
     {
      StatusLight="Online";
      StatusInverter="Offline";
     }
     else{
       
         StatusLight="Offline";
         StatusInverter="Offline";
     }
        
     const marker = L.marker(location.coordinates).addTo(map);
  
     marker.bindPopup(`
     <b style="font-size: 1.25em;">Junction :${location.data.Junction}</b>
     <table class="table">
       <tbody> 
         <tr>
           <th style="color: #444">Junction Status</th>
           <td style="color: #444" class="text-${stLight ? 'success' : 'danger'}">${StatusLight}</td>
         </tr>
          <tr>
           <th style="color: #444">Inverter Status</th>
           <td style="color: #444" class="text-${stInverter ? 'success' : 'danger'}">${StatusInverter}</td>
         </tr>
         <tr>
           <th style="color: #444">DCV</th>
           <td style="color: #444">${location.data.DCV}</td>
         </tr>
         <tr>
           <th style="color: #444">DCI</th>
           <td style="color: #444">${location.data.DCI}</td>
         </tr>
           <tr>
           <th style="color: #444">ACV</th>
           <td style="color: #444">${location.data.ACV}</td>
         </tr>
           <tr>
           <th style="color: #444">ACI</th>
           <td style="color: #444">${location.data.ACI}</td>
         </tr>
       
         <tr>
           <th style="color: #444">On Since</th>
           <td style="color: #444">
             ${moment.utc((location.data.lastOnTime || location.data.lastHeartBeatTime).replace('Z', '')).local().format('DD-MMM-YYYY<br/>hh:mm a')}
           </td>
         </tr>
         <tr class="${st ? 'd-none' : ''}">
           <th style="color: #444">Last Online At</th>
           <td style="color: #444">
             ${location.data.lastHeartBeatTime ? moment.utc(location.data.lastHeartBeatTime.replace('Z', '')).local().format('DD-MMM-YYYY<br/>hh:mm a') : 'NA'}
           </td>
         </tr>
       </tbody>
     </table>
   `);
   
   });
 
  
      
  }, [center, locations]);

  useEffect(() => {
    loadMap();
  }, [loadMap]);

  


  const calculateBounds = (c, lo) => {
    const padding = 0.02;
    const bounds = L.latLngBounds([
      [c[0] - padding, c[1] - padding],
      ...lo.map(location => [
        location.coordinates[0],
        location.coordinates[1]
      ])
    ]);
    return bounds;
  };

    return(
        <Card>
            <Container maxWidth='xxl'>
            <div id="map" style={{ height: '600px', marginTop:'20px' }}/>
            </Container>
         </Card>
      
    )
}


Map.propTypes = {
    center: PropTypes.any,
    locations:PropTypes.any,
    MachineType:PropTypes.any
  };