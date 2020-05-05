console.log('App started')
let weatherInput = document.querySelector('form');
let search = document.querySelector('input')
let message1 = document.getElementById('message-1');
let message2 = document.getElementById('message-2');


weatherInput.addEventListener('submit', (e)=>{
    e.preventDefault();
    let address = search.value;
    
    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
            }else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})