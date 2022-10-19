import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');




function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay })

      } else {
        reject({ position, delay })
      }
    },delay)
  })
}
form.addEventListener('submit', (e) => {
  e.preventDefault()
  let amount = Number(e.target.children[2].firstElementChild.value)
  let firstDelay = Number(e.target.firstElementChild.firstElementChild.value)
  let delay = Number(e.target.children[1].firstElementChild.value)
  

  for (let i = 0; i <= amount; i++) {
    

    createPromise(i, firstDelay).then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
    }).catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
    })
    
    firstDelay = firstDelay + delay
  }

})
