let score = 0
let timer = 10
const highscore_api = 'https://rws7lufvk2.execute-api.us-east-1.amazonaws.com/Prod/highscore'
const Word_API = 'https://random-word-api.herokuapp.com/word'
const wordElement = document.getElementById('word')
const wordInputElement = document.getElementById('input')
const timerElement = document.getElementById('timer')
const scoreElement = document.getElementById('cscore')
scoreElement.innerText = score

function countdown() {
    timerElement.innerText = `${timer}`
    if (timer > 0){
        timer--
    }
    else {
        document.getElementById('input').disabled = true
        if (compare_scores() === true) {
            let data = {
                "ID": 0,
                "Highscore": score
              }
            const putdata = async () =>{
                await fetch(highscore_api, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type":"application/json",
                        "Access-Control-Allow-Origin": "*",
                        'Access-Control-Allow-Methods': 'PUT,OPTIONS,GET'
                    }
                }) 
                console.log(data)
            }
            putdata()
        }
    }
}

function get_random_word() {
    return fetch(Word_API)
    .then(response => {
		if (response.ok) {
			console.log('SUCCESS')
		} else {
			console.log('NOT SUCCESSFUL')
		}    
	return response.json()
	})
    .then(data => data[0])
    
}

async function split_word() {
    const word = await get_random_word()
    wordElement.innerText = ''
    word.split('').forEach(character => {
        const charSpan = document.createElement('span')
        charSpan.innerText = character
        wordElement.appendChild(charSpan)
    })
    wordInputElement.value = null
}

function score_tracker() {
    score = score+ 1
    console.log(score)
    scoreElement.innerText = score
}

function retrive_highscore() {
    fetch(highscore_api)
    .then(response => {
    return response.json()
})
    .then(data => {
    const highscore = `${data}`
    const data_div = document.querySelector('.highscore')
    data_div.innerHTML = highscore
    return data
})
}

function compare_scores() {
    const highscore = document.getElementById('highscore').innerText
    if (score > highscore) {
        alert("Congragulations you beat the highscore")
        return true
    }
    else {
        return false
    }
        
}


wordInputElement.addEventListener('input', interval_timer = () =>{
    const ID = setInterval(countdown, 1000)
    setTimeout( () => {
        clearInterval(ID)
    }, 10000 )
}, {once: true})



wordInputElement.addEventListener('input', () =>{
    const wordList = wordElement.querySelectorAll('span')
    const wordValue = wordInputElement.value.split('')
    let correct = true
    wordList.forEach((characterSpan, index) => {
        const character = wordValue[index]
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }   else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')        
        }   else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
        
    })
    if (correct)
        score = score+ 1
        scoreElement.innerText = score
    
    if(correct)
        split_word()
})

split_word()
countdown()
retrive_highscore()


