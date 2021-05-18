'use require'
const tokens={user:'ipn', password:"trU7cTiZpjdR"}

const accedeApi=async()=>{
    const res= await fetch('https://www.metaweather.com/api/location/search/?query=san');
    
    const data= await res.json();
    console.log(data);
}

accedeApi();