console.log('js on')

const modal = document.querySelector('.modal');
const settings = document.querySelector('.settings');
const butx = document.querySelector('.button-x');

console.log(modal)
console.log(settings)
console.log(butx)



settings.addEventListener("click", ()=>{
    modal.style.cssText = 'visibility: visible;'
})
butx.addEventListener("click", ()=>{
    modal.style.cssText = 'visibility: hidden;'
})

///////////////////////// SETTINGS ///////////////////////////////////
const alyBtn = document.getElementById('apply')
console.log(alyBtn)

alyBtn.addEventListener("click", ()=>{
    const pomodoro = document.getElementById('pomodoro')
    const stBreak = document.getElementById('shortBreak')
    const lgBreak = document.getElementById('longBreak')
    console.log(pomodoro.value)
    console.log(stBreak.value)
    console.log(lgBreak.value)
    setValores(pomodoro.value, stBreak.value, lgBreak.value)

    modal.style.cssText = 'visibility: hidden;'
})


function setValores(p, s, l){
    console.log(p)
    console.log(s)
    console.log(l)

     if (p != 0 && s != 0 && l != 0){
        localStorage.clear();
        /* localStorage.setItem('pomodoro', p)
        localStorage.setItem('shortbreak', s)
        localStorage.setItem('longbreak', l) */
        localStorage.setItem('Focus', p)
        localStorage.setItem('Short Break', s)
        localStorage.setItem('Long Break', l)
        loadTimer('Focus')
        
        return

    }
    alert('Por favor, defina os intervalos para o seu Pomodoro.') 
}

///////////////////////////// LOGIC /////////////////////
const startStop = document.querySelector('.start-stop')
const progressBar = document.querySelector('.timer')

let minElem = document.querySelector('#minutes')
let secElem = document.querySelector('#seconds')
let min = localStorage.getItem('pomodoro')
let sec = min * 60

let progress = null
let progressStart = 0
let progressEnd = sec
let speed = 1000
let degTravel = 360 / progressEnd
let secRem = 0
let minRem = 0
//////////////////////// STAGE SELECTOR //////////////////////////
let focusMode = document.querySelector('.focus')
let shortMode = document.querySelector('.short-break')
let longMode = document.querySelector('.long-break')
let stageItems = document.querySelectorAll('.stage-item')
console.log(stageItems)
for(let i = 0; i < stageItems.length; i++){
    //console.log(sectBtn[i])
    stageItems[i].addEventListener('click', function(){
        let currentBtn = document.querySelectorAll('.stage-item-active')
        currentBtn[0].className = currentBtn[0].className.replace('stage-item-active', '')
        this.className += ' stage-item-active'
        console.log(this.innerText)
        loadTimer(this.innerText)
    })
}



//////////////////////// ATUALIZAR O TIMER ///////////////////////
function loadTimer(firstStage){
    let timerDisplay = document.querySelector('#minutes')
    let timerDisplaysec = document.querySelector('#seconds')
    if(localStorage.getItem(firstStage)){
        //console.log(timerDisplay.innerText)
        if (localStorage.getItem(firstStage).length < 2){
            timerDisplay.innerText = '0' + localStorage.getItem(firstStage)
            min = localStorage.getItem(firstStage)
            sec = min * 60
            progressEnd = sec
            timerDisplaysec.innerText = '00'
        } else{
            timerDisplay.innerText = localStorage.getItem(firstStage)
            min = localStorage.getItem(firstStage)
            sec = min * 60
            progressEnd = sec
            timerDisplaysec.innerText = '00'  
        }
        
    }
    else{
        timerDisplay.innerText = '00'
        timerDisplaysec.innerText = '00'
    }
    //console.log(timerDisplay.innerText)
}
///////////////////// START - STOP btn /////////////////////
startStop.addEventListener("click", ()=>{
    console.log('progressStart is ' + progressStart)
    if (startStop.innerHTML === '<h2>Start</h2>'){
        if(minElem.innerHTML != 0){
            startStop.innerHTML = '<h2>Stop</h2>'
            startStopProgressBar()
        } else {
            alert('Configure o TIMER clicando no botão SETTINGS.')
        }
    } 
    else{
        startStop.innerHTML = '<h2>Start</h2>'
        startStopProgressBar()
    }
})

///////////////////// Progress bar /////////////////////

async function startStopProgressBar(){
    if(!progress){
        //progresStage = 1
        progress = await setInterval(progressTrack, speed)
        console.log('progresStage = ' + progresStage)
    }
    else {
        clearInterval(progress)
        progress = null
        progressStart = 0
        progressBar.style.background = `conic-gradient(
            #1717a 360deg,
            #1717a 360deg
        )`
    }
}
///////////////////// Progress Track /////////////////////
let progresStage = 1
function playAlarm(){
    console.log('starting alarm')
    //var audio = new Audio('https://lucaslopeslima.com.br/projects/PROJETO_Pomodoro/audio/alarm.mp3');
    var audio = new Audio('../audio/alarm.mp3');
    audio.play();
    console.log('alarm played')
}

async function progressTrack() {
    console.log('track on')
    progressStart++;
    degTravel = 360 / progressEnd
    secRem = Math.floor((progressEnd - progressStart) % 60);
    minRem = Math.floor((progressEnd - progressStart) / 60);
  
    secElem.innerHTML = secRem.toString().length == 2 ? secRem : `0${secRem}`;
    minElem.innerHTML = minRem.toString().length == 2 ? minRem : `0${minRem}`;
  
    progressBar.style.background = `conic-gradient(
          #9d0000 ${progressStart * degTravel}deg,
          #17171a ${progressStart * degTravel}deg
        )`;
    if (progressStart == progressEnd) {
      progressBar.style.background = `conic-gradient(
          #00aa51 360deg,
          #00aa51 360deg
        )`;
      clearInterval(progress);
      
      progress = null;
      progressStart = 0;
      
      //await switchingStage('shortbreak')
      startStop.innerHTML = "<h2>Start</h2>";
      console.log('THE END!!!')
      console.log('track off')
      playAlarm()
      /* const myTimeout = setTimeout(playAlarm, 1000);
      myTimeout */
    }
}

///////////////////// Trocando de Modo /////////////////////
async function switchingStage(stage){
    console.log('swiStage on')
    min = localStorage.getItem(stage)
    sec = min * 60
    loadTimer(stage)
    await startStopProgressBar()
    console.log('swiStage off')
}


///////////////////// RESET /////////////////////
  function resetValues() {
    if (progress) {
      clearInterval(progress);
    }
    minutes = document.querySelector("#minutes").innerHTML;
    seconds = document.querySelector("#seconds").innerHTML;
    progress = null;
    progressStart = 0;
    progressEnd = sec
    degTravel = 360 / progressEnd
    progressBar.style.background = `conic-gradient(
          #17171a 360deg,
          #17171a 360deg
        )`;
  }

minElem.onblur = function () {
    resetValues();
};

secElem.onblur = function () {
    resetValues();
};



/*
progress = pomodoro
if progress == pomodoro{
    progresStage++
    progress = shortbreak
}
if progress == shortbreak{
    progresStage++
    progress = longbreak
}
if progress == longbreak{
    progressStage++
    progress = null
}

progress = null

*/