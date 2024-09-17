export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export function emptyRows(page, rowsPerPage, arrayLength) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

// function descendingComparator(a, b, orderBy) {
//   if (a[orderBy] === null) {
//     return 1;
//   }
//   if (b[orderBy] === null) {
//     return -1;
//   }
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }
export function getComparator(order, orderBy) {
  
  
    return order === 'desc'
    ? (a, b) => parseInt(b[orderBy],10) < parseInt(a[orderBy],10) ? -1 : 1
    : (a, b) => parseInt(a[orderBy],10) < parseInt(b[orderBy],10) ? -1 : 1;
  
}

export function applyFilter({ inputData, comparator, filterName ,filterMinSerial ,filterMaxSerial}) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  // if (filterName) {
  //   // inputData = inputData.filter(
  //   //   (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
  //   // );
     
  //   inputData= inputData.filter((item) => {
  //     const lowerCaseSearchTerm = filterName.toLowerCase();
  //     return Object.values(item).some((value) =>
  //       String(value).toLowerCase().includes(lowerCaseSearchTerm)
  //     );
  //   });

  // }

  // if(filterMinSerial)
  // {
  //   inputData = inputData.filter(
  //     (user) => user.SerialNumber.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
  //   );
  // }
 
  const maxSerial = filterMaxSerial
  const minSerial = filterMinSerial

  return inputData
    .filter(item => {
      const matchesName = !filterName || (item.MacID && item.MacID.includes(filterName));
      const matchesMaxSerial = !filterMaxSerial || (parseInt(item.SNoutput ,10) <= maxSerial);
      const matchesMinSerial = !filterMinSerial || (parseInt(item.SNoutput,10) >= minSerial);
      return matchesName && matchesMaxSerial && matchesMinSerial;
    })
    .sort(comparator);
 
  

  // return inputData;
}
