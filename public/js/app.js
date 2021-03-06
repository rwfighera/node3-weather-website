const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault(); // prevents page from refreshing

    const location = search.value; // gets the value from the input field


    messageOne.textContent = 'Loading';
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.forecast.location;
                messageTwo.textContent = `${data.forecast.temperature} ${data.forecast.weather_descriptions}. Humidity ${data.forecast.humidity}`;
                console.log(data.forecast);
            }
        })
    })
})