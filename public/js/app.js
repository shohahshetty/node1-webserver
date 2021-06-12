console.log('Client side javascript is loaded!')

// fetch('http://localhost:3000/weather?address=Surathkal').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.forecast)
//             console.log(data.address)        
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const forecasttxt = document.querySelector('#forecasttxt')
const locationtxt = document.querySelector('#locationtxt')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value

    forecasttxt.textContent= '...loading'
    locationtxt.textContent=''

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
            if(data.error){
                forecasttxt.textContent= data.error
            }else{
                forecasttxt.textContent= data.forecast
                locationtxt.textContent=data.address
            }
        }) 
    })

    
})
