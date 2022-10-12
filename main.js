let smallTag = document.querySelector('small');
let inputV = document.querySelector('.searchBar');

class weather{

    static fetchWeather(city){
        let apiKey = 'e88d31cb9e880dd476a27448d045750d';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(res=> res.json())

        .then(data => {
            if(data.message == "city not found"){
                smallTag.style.color = 'red';
                smallTag.innerText = "Please Type A Valid City";
                inputV.style.borderColor = "red";
                console.log(data.message);
                console.log(data);
            }else{
                this.displayWeather(data)
                smallTag.innerText = "";
                inputV.style.borderColor = "gray";
                console.log(data.message);
                console.log(data);
            }
            
        })
    }
    static displayWeather(data){
        //grabing values from api
        const name = data.name;
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const humidity = data.main.humidity;
        const speed = data.wind.speed;

        //Using DOM to display values from api
        document.querySelector('.city').innerText = `${name}`;
        document.querySelector('.temp').innerText = `${temp}°C`;
        document.querySelector('.icon').src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.description').innerText = `${description}`;
        document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
        document.querySelector('.wind').innerText = `Wind Speed: ${speed}km/h`;

        //Celsius and Farenhiet Btns
        let far = (temp * 1.8) + 32;
        let far2 = Math.round(far * 100)/100;
        let farenhiet = document.querySelector('.far');
        farenhiet.addEventListener('click',(e)=>{
            if(e.target.className == 'far'){
                document.querySelector('.temp').innerText = `${far2}°F`;
            }
        })
        //Celsiuis
        document.querySelector('.cell').addEventListener('click',()=>{
            document.querySelector('.temp').innerText = `${temp}°C`;
        })

        //Each time we display weather remove loading
        document.querySelector('.weather').classList.remove('loading');
    }
    static searcher(){
        let inputValue = document.querySelector('.searchBar').value;
        this.fetchWeather(inputValue);
    }
    
}

document.querySelector('.searchBtn').addEventListener('click',()=>{
    if(document.querySelector('.searchBar').value == ""){
        smallTag.innerText = "Plese Type in City";
        smallTag.style.color = "red";
        inputV.style.borderColor = "red";
    }else{
        weather.searcher();
        smallTag.innerText = "";
        
        inputV.style.borderColor = "gray";
    }
    
})
document.querySelector('.searchBar').addEventListener('keyup',(e)=>{
    if(inputV.value == "" && e.key == "Enter"){
        smallTag.innerText = "Plese Type in City";
        smallTag.style.color = "red";
        inputV.style.borderColor = "red";
    }else if(e.key == "Enter" && inputV.value != ""){
        weather.searcher();
        smallTag.innerText = "";
        
        inputV.style.borderColor = "gray";
    }
        
    
})


weather.fetchWeather('Las Vegas');

