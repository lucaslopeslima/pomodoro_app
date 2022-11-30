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
        localStorage.setItem('pomodoro', p)
        localStorage.setItem('shortbreak', s)
        localStorage.setItem('longbreak', l)
        loadTimer()
        
        return

    }
    alert('nao') 
}

///////////////////////////// LOGIC /////////////////////
const startStop = document.querySelector('.start-stop')
const progressBar = document.querySelector('.timer')

let minElem = document.querySelector('#minutes')
let min = localStorage.getItem('pomodoro')
let secElem = document.querySelector('#seconds')
let sec = min * 60

let progress = null
let progressStart = 0
let progressEnd = sec
let speed = 1000
let degTravel = 360 / progressEnd
let secRem = 0
let minRem = 0

console.log(startStop)
console.log('min é '+min)
console.log('sec é '+sec)
console.log('progressStart is ' + progressStart)
console.log('end é ' + progressEnd)
//////////////////////// ATUALIZAR O TIMER ///////////////////////
function loadTimer(){
    let timerDisplay = document.querySelector('#minutes')
    let timerDisplaysec = document.querySelector('#seconds')
    if(localStorage.getItem('pomodoro')){
        console.log(timerDisplay.innerText)
        timerDisplay.innerText = localStorage.getItem('pomodoro')
        min = localStorage.getItem('pomodoro')
        sec = min * 60
        progressEnd = sec
        timerDisplaysec.innerText = '00'
    }
    else{
        timerDisplay.innerText = '00'
        timerDisplaysec.innerText = '00'
    }
    console.log(timerDisplay.innerText)
}

startStop.addEventListener("click", ()=>{
    console.log('progressStart is ' + progressStart)
    if (startStop.innerHTML === '<h2>Start</h2>'){
        if(minElem != 0){
            startStop.innerHTML = '<h2>Stop</h2>'
            startStopProgressBar(/* 'start' */)
        } else {
            alert('Configure o TIMER clicando no botão SETTINGS.')
        }
    } 
    else{
        startStop.innerHTML = '<h2>Start</h2>'
        startStopProgressBar(/* 'stop' */)
    }
})


function startStopProgressBar(/* prop */){
    /* 
    if(prop == 'start') {
        console.log('start')
        

    } else {
        console.log('stop')

    } */
    if(!progress){
        progress = setInterval(progressTrack, speed)
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

function progressTrack() {
    progressStart++;
  
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
      startStop.innerHTML = "START";
      progress = null;
      progressStart = 0;
    }
  }

  function resetValues() {
    if (progress) {
      clearInterval(progress);
    }
    minutes = document.querySelector("#minutes").innerHTML;
    seconds = document.querySelector("#seconds").innerHTML;
    toggleSettings = false;
    minElem.contentEditable = false;
    minElem.style.borderBottom = `none`;
    secElem.contentEditable = false;
    secElem.style.borderBottom = `none`;
    progress = null;
    progressStart = 0;
    progressEnd = parseInt(minutes) * 60 + parseInt(seconds);
    degTravel = 360 / progressEnd;
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