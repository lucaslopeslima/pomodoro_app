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
    /* let pomoTime = p
    let shortTime = s
    let longTime = l */
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

function loadTimer(){
    let timerDisplay = document.querySelector('#minutes')
    console.log(timerDisplay)
}