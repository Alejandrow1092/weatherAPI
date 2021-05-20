'use require'
const card=document.getElementById('weatherCart');
const url='https://www.metaweather.com/api/location/';

//funcion para acceder a la API
const accedeApi=async (urlFetch)=>{
    const res= await fetch(url.concat(urlFetch));
    const data =await res.json();
    return data;
}

const getCity=async ()=>{
    const data=await accedeApi('search/?query=london');
    const {title, woeid}=data[0];
    console.log(title)
    console.log(woeid)

    card.innerHTML=`
    <h2 style="color:white; text-transform:uppercase">${title}<h2>
    `;
    getCityData(woeid);
}

const getCityData=async woeid=>{
    const data=await accedeApi(woeid);
    const res=await data.consolidated_weather;
    const {the_temp}=res[0];
    const {weather_state_name} =res[0];
    card.innerHTML+=`
   <span id="state">${weather_state_name}</span><br>
    <span id="the_temp">${Math.round(the_temp)}°C</span>
    <br>
    <div id="headers">
        <span id="day">Day</span> <span>    </span>  <span>   </span>   <span id="max">Max</span> <span>Min</span>
    </div>

    `;
    const result= res.map((dia)=>fillCart(dia)).join(' ');
    card.innerHTML+=result;

}

const fillCart=  ({applicable_date, weather_state_abbr,
                min_temp,max_temp})=>{
                
    return `
    <section id="weatherDays">
        <span>${applicable_date}</span> 
        <img id="imgWeather" src="https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg">
        <span> ${Math.round(min_temp)}</span>  <span id="minw">${Math.round(max_temp)}</span> 
                
    </section>
    
    `;
}


getCity();