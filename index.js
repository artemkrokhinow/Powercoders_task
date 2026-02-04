
import csv from 'csv-parser';
import fs from'fs';
const Client_ID = [];
const  results = [];
const newArray = [];
function processData() {
    ///raw_client_data.csv change to your file 
fs.createReadStream('raw_client_data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {for (let i = 2; i < results.length; i++) {
    const dataObject = results[i];
    const nameData = dataObject[0]; 
    const rawString = dataObject['SYSTEM_EXPORT_ID: #8842-Alpha']   ;
    if (rawString){
const dataOfObject = rawString.split('|');
    let regionCode = 'XX'
    let statusCode = '01'
    let [name, city, year, status, date] = dataOfObject
    if(city === 'Zurich'){  
        regionCode = 'ZH';
}else if(city ===  'Bern'|| city === 'Berne'){
    regionCode = 'BE';
    
}else if(city ===  'Geneva'|| city === 'Genf'){
    regionCode = 'GE';
} else if(city ===  'Lausanne'){
    regionCode = 'VD';
}
else{
    regionCode = 'XX';
};

if(status === 'Standard'){
    statusCode = '01'
}
else if(status === 'VIP'){
    statusCode = '99'
}
if(date.includes('.')){
const [year, month, day] = date.split('.');
if(day.length === 4){
    date = `${day}-${month}-${year}`
} else{
    date =`${year}-${month}-${day}`
}
if(day.length === 4 ){
    date = `${day}-${month}-${year}`
}
}else if(date.includes('/')){
const [year, month, day] = date.split('/');
if(day.length === 4){
    date = `${day}-${month}-${year}`
} else{
    date =`${year}-${month}-${day}`
}
if(day.length === 4 ){
    date = `${day}-${month}-${year}`
}
}


Client_ID.push({
    City: regionCode,
    Year_Joined: year,
    Member_Status: status
    })
const clientId = makeClientId(regionCode, year, statusCode);
newArray.push({
Client_ID: clientId,
 Full_Name:name,
 Region_Code:regionCode,
 ISO_Date:date
})

    }
    }
    console.log(newArray)
}


)}
  processData();


function makeClientId(regionCode, year, status){
   return(`${regionCode}-${year}-${status}`);
}


  