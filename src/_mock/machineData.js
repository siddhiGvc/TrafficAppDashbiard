// import { useRouter } from 'src/routes/hooks';

const API = 'http://165.232.180.111:8080';

export const fetchData=async()=> {
  
  try {
    const headers = new Headers({
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`${API}/trafficLights/getAllJunstion`, { method: 'GET', headers });
    const json = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    console.error('Error fetching data:', error);
    
    return [];
  }
}

export const fetchInverter=async()=> {
  
  try {
    const headers = new Headers({
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`${API}/trafficLights/getInverterStatus`, { method: 'GET', headers });
    const json = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    console.error('Error fetching data:', error);
    
    return [];
  }
}

// export const useDataFetching = () => {
//   const router = useRouter();

//   const fetchDataWithRouter = async () => {
//     try {
//       const data = await fetchData();
//       // Process the data or update the state as needed
//       console.log('Data:', data);
//     } catch (error) {
//       // Handle errors
//       console.error('Error:', error);
//       router.push('/');
//     }
//   };

//   return { fetchDataWithRouter };
// };


   
  

  