//This script is running on client side Javascript 

console.log('Client side javascript file is loaded');

const weatherForm= document.querySelector('form');
const search= document.querySelector('input');
const messageOne= document.querySelector('#messageOne');
const messageTwo= document.querySelector('#messageTwo');

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    const location= search.value;
    messageTwo.textContent= "Loading...";
    messageOne.textContent= "";
    var url= `http://localhost:3000/weather?address=${location}`;
    fetch(url)
        .then(r=> {
            return r.json();
        })
        .then (g=> {
            if (g.error) {
                messageOne.textContent= g.error;
                messageTwo.textContent= "";
            } else {
            messageOne.textContent= g.location;
            messageTwo.textContent= g.forecast;
            }
        })
        .catch(e=> {
            console.log(e);
        });
});


