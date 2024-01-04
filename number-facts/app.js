const baseURL = "http://numbersapi.com"
const favNum = 2
const favNumArr = []
const randomNumbersArr = [] 

// one request for fav number
const FavNumResponse = () => { 
    axios
    .get(`${baseURL}/${favNum}?json`)
    .then(response => {
        $(`<li class="list-group-item">${response.data.text}</li>`).appendTo('.facts-container-1')}
        )
    .catch(err => console.log(err))
}

const multipleNumbers = () => {
    for (let i = 0; i < 4; i++){
        randomNumbersArr.push(Math.floor(Math.random() * 1000)+1)
    }
    axios
    .get(`${baseURL}/${randomNumbersArr[0]},${randomNumbersArr[1]},${randomNumbersArr[2]},${randomNumbersArr[3]}`)
    .then(response => {
        for (let item in response.data){
            $(`<li class="list-group-item">${response.data[item]}</li>`).appendTo('.facts-container-2')
        }
    })
    .catch(err => console.log('Error', err))
}

function FavNumMultipleFacts() {  
    for (let i = 0; i < 5; i++){
        favNumArr.push(axios.get(`${baseURL}/${favNum}?json`))
    }
    Promise.all(favNumArr)
        .then(Arr => Arr.forEach((i)=> {
            $(`<li class="list-group-item">${i.data.text}</li>`).appendTo('.facts-container-3')
        }))
        .catch(err => console.log(err))
}


FavNumResponse()
multipleNumbers()
FavNumMultipleFacts()