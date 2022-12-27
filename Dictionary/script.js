const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
let search = document.getElementById('search');
let domword = document.getElementById('word');
let dompartsofspeech = document.getElementById('partsofspeech');
let domslang = document.getElementById('slang');
let dommeaning = document.getElementById('meaning');
let domexample = document.getElementById('example');
let domother = document.getElementById('other');
let sound = document.getElementById('sound');
let word;
let cancel = document.getElementById('cancel');
document.body.addEventListener('keypress',e=>{
    if(e.key=='Enter'){
        word = document.getElementById('userInput').value;
        if(word==""){
            cancel.style.display = "none";
            domword.textContent = "Please enter words to check :)"
        }
        else{
            process(word,url);
        }
    }
})
function start(){
    word = document.getElementById('userInput').value;
    if(word==""){
        cancel.style.display = "none";
        domword.textContent = "Please enter words to check :)"
    }
    else{
        process(word,url);
    }
}
function voice(){
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "en-GB";
    recognition.onresult =function(event){
        console.log(event);
        document.getElementById('userInput').value = event.results[0][0].transcript;
        let text = event.results[0][0].transcript;
        let wordArr = text.split(" ");
        let voiceword = wordArr[wordArr.length-1];
        if(voiceword==""){
            cancel.style.display = "none";
            domword.textContent = "Please enter words to check :)"
        }
        else{
            process(voiceword,url);
        }
    }
    recognition.start();
}
async function process(word,url){
    try{
        const response = await fetch(`${url}${word}`);
        const data = await response.json();
        cancel.style.display = "inline";
        sound.style.display = "inline";
        let utterance = new SpeechSynthesisUtterance(word);
        sound.onclick=()=>{
            speechSynthesis.speak(utterance);
        }
        domword.innerHTML = `<b>${word}</b>`;
        dompartsofspeech.innerHTML = `<b>Parts of Speech : </b>${data[0].meanings[0].partOfSpeech}`;
        domslang.innerHTML = `<b>Phonetics : </b>${data[0].phonetic}`;
        dommeaning.innerHTML = `<b>Definition : </b>${data[0].meanings[0].definitions[0].definition}`;
        domexample.innerHTML = `<b>Example : </b>${data[0].meanings[0].definitions[0].example}`;
        let defarr = data[0].meanings[0].definitions;
        defarr.forEach(element => {
            domother.innerHTML = `<b>Other Definition :</b>${element.definition}`;
        });
    }catch(error){
        domword.textContent = "Check out the spelling (or) Try Something Different";
        sound.style.display = "none";
    }
    cancel.onclick=()=>{
        document.getElementById('userInput').value="";
        domword.textContent = "";
        dompartsofspeech.textContent = "";
        domslang.textContent = "";
        dommeaning.textContent = ""; 
        domexample.textContent = "";
        domother.textContent = "";
        cancel.style.display = "none";
        sound.style.display = "none";
        
    }
}