const textBox = document.getElementById('text-box')
const searchBtn = document.getElementById('search-btn')
const wordDom = document.getElementById("word")
const phoneticsTextDom= document.getElementById("phonetics-text")
const partOfSpeechDom = document.getElementById("part-of-speech")
const definitionsDom = document.getElementById("definitions")
const audioDom = document.getElementById("audio")


async function getData () {
    
    try {
        const FULL_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en'
        const response = await fetch(`${FULL_URL}/${textBox.value}`)
        return response.json()
       
    } catch (error) {
        console.log(error)
    }
    
    
}

async function searchText () {
    try {
        wordDom.innerText = ""
        phoneticsTextDom.innerText = ""
        partOfSpeechDom.innerText = ""
        definitionsDom.innerText = ""
        audioDom.innerText = ""
        const data = await getData()
        displayData(data)
    } catch (error) {
        console.log(error)
    }
   
   
}

function displayData (data) {

    try {
        console.log(data)
        wordDom.innerText = data[0].word
        partOfSpeechDom.innerText = data[0].meanings[0].partOfSpeech
        phoneticsAudioInfo(data)
        definitionsInfo(data)
        phoneticsTextInfo(data)
    } catch (error) {
        console.log(error)
    }
    
        

}




function phoneticsAudioInfo(data) {
    try {
        if (data[0].phonetics.length === 0) {
            
           
        } else {
            
    
            for (let i = 0; i < data[0].phonetics.length; i++) {
                if ( data[0].phonetics[i].hasOwnProperty("audio")) {
                    if(data[0].phonetics[i].audio === "") {
                        
                        
                    } else {
                        
                        const phoneticsAudio =   data[0].phonetics[i].audio
    
                        const buttonAudio = document.createElement("button")
                        const audio = new Audio(phoneticsAudio)
                        audioDom.appendChild(buttonAudio)
                        buttonAudio.addEventListener('click', () => {
                            audio.play()
                        })
                        break;
                    }
                }
            }
            
        }
    } catch (error) {
        console.log(error)
    }
    
}

function definitionsInfo(data) {
    const definitions =  data[0].meanings[0].definitions

    for (let i = 0; i < definitions.length; i++) {
        const definition = document.createElement('li')
        definition.innerText = definitions[i].definition
        definitionsDom.appendChild(definition)
    }
}

function phoneticsTextInfo(data) {
    let phoneticsText 
    if (data[0].phonetic !== undefined ) {
        phoneticsText = data[0].phonetic
        phoneticsTextDom.innerText =  phoneticsText
        
    } else {
        
        


        for (let i = 0; i < data[0].phonetics.length; i++) {
            if ( data[0].phonetics[i].hasOwnProperty("text")) {
                if(data[0].phonetics[i].text === "") {
                    
                } else {
                    phoneticsText = data[0].phonetics[i].text
                    phoneticsTextDom.innerText =  phoneticsText
                    break;
                }
            }
        }


    }
}

searchBtn.addEventListener('click', searchText)


const navMenu = document.getElementById('nav-menu')
const navExit = document.getElementById('nav-exit')
const navigation = document.querySelector('nav')


navMenu.addEventListener('click', () => {
    navigation.classList.add('display-menu')
})

navExit.addEventListener('click', () => {
    navigation.classList.remove('display-menu')
})