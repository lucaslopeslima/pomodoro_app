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


