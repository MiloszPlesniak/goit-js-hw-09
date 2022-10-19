const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
console.log(btnStart)

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let setColorTimer
const changeBodyColor = () => {
body.style.backgroundColor = `${getRandomHexColor()}`
}
btnStart.addEventListener('click', () => {
    btnStart.setAttribute("disabled","disabled")
    setColorTimer = setInterval(changeBodyColor, 1000)
})

btnStop.addEventListener('click', () => {
    clearInterval(setColorTimer)
    btnStart.removeAttribute('disabled')
})


