"use strict"

import data from './data.json' assert{type: 'json'}

console.log(data)

const contentCards = document.querySelector('.second-section')

const daily = document.getElementById('daily')
const weekly = document.getElementById('weekly')
const monthly = document.getElementById('monthly')

const colors = [
    'hsl(15, 100%, 70%)',    // Light red (work)
    'hsl(195, 74%, 62%)',    // Soft blue (play)
    'hsl(348, 100%, 68%)',   // Light red (study)
    'hsl(145, 58%, 55%)',    // Lime green (exercise)
    'hsl(264, 64%, 52%)',    // Violet (social)
    'hsl(43, 84%, 65%)'      // Soft orange (self care)
  ];
  
const works = data.map( work => work.title )

console.log(works)
function lowerWithDashes(array) {
    const convertedStrings = array.map((string) => {
      const lowercaseString = string.toLowerCase();
      const stringWithDashes = lowercaseString.replace(/\s+/g, '-');
      return stringWithDashes;
    });
  
    return convertedStrings;
  }

const  activities = lowerWithDashes(works)

const frequency = [weekly, monthly, daily]

const aRclass = ( time ) => {
    time.classList.add('main-card_frequency--active')
    frequency.forEach( f =>{
        if(time != f ){
            f.classList.remove('main-card_frequency--active')
        }
    })
}

window.addEventListener('DOMContentLoaded', (event) => {
    requestBetwennQuotes('daily')
    aRclass(daily)

  });
weekly.addEventListener( 'click', (e) => {
    requestBetwennQuotes('weekly')
    aRclass(weekly)

})
monthly.addEventListener( 'click', (e) => {
    requestBetwennQuotes('monthly')
    aRclass(monthly)
})

daily.addEventListener( 'click', (e) => {
    requestBetwennQuotes('daily')
    aRclass(daily, 'daily')


})

const requestBetwennQuotes = (time)=> {
    contentCards.innerHTML = ''
    let fragment =  new DocumentFragment()
    data.forEach( (works, index) => {

        let card = document.createElement('div')       
        card.innerHTML +=   `
            <div class="card">
            <div class="card__background" style="background:${colors[index]}">
            <img class="card__image" src="/images/icon-${activities[index]}.svg" alt="">
            </div>
            <div class="card__details">
            <div class="card__activity">
                <p class="card__title">${works.title}</p>
                <img class="card__dots" src="/images/icon-ellipsis.svg" alt="...">
            </div>
            <div class="card__time">
                <p class="card__hours"> ${works.timeframes[time].current}hrs</p>
                <p class="card__previous"> Previous - ${works.timeframes[time].previous}hrs</p>
            </div>
            </div>  
            </div>`
    
        fragment.appendChild(card);
        } )
        contentCards.appendChild(fragment)

}