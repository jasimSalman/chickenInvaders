let chickensContainer = document.querySelector('.container')

//This functio to allow the palyer to shoot from his spaceship
const shootChicken = (event) => {
  let xAxis = event.clientX
  let yAxis = event.clientY

  let shoot = newElement(
    'div',
    "url('images/fire.png')",
    '40px',
    '200px',
    'contain',
    'no-repeat',
    `${xAxis}px`,
    `${yAxis}px`,
    'fixed'
  )
  document.body.append(shoot)
  moveShoots(shoot)
}

//This function  will append chickens randomly in the window
const repeatChicken = () => {
  let repeatCount = Math.floor(Math.random() * 11) + 5

  for (let i = 0; i < repeatCount; i++) {
    let chicken = document.createElement('div')
    chicken.classList.add(`chicken${i}`)
    chicken.style.backgroundImage =
      "url('https://mostaql.hsoubcdn.com/uploads/thumbnails/570460/378580/ab2952b5-3a7f-4c9e-8c65-52b1fd800a72.png')"
    chicken.style.width = '110px'
    chicken.style.height = '110px'
    chicken.style.display = 'inline-block'
    chicken.style.backgroundSize = 'contain'
    chicken.style.backgroundRepeat = 'no-repeat'
    chickensContainer.appendChild(chicken)
  }

  document.body.appendChild(chickensContainer)
}

repeatChicken()

//This function will creat new elemnts to appen on the window
const newElement = (
  elemType,
  backgroundImg,
  width,
  height,
  bgSize,
  bgRepeat,
  left,
  top,
  position
) => {
  let elem = document.createElement(elemType)
  elem.style.background = backgroundImg
  elem.style.width = width
  elem.style.height = height
  elem.style.backgroundSize = bgSize
  elem.style.backgroundRepeat = bgRepeat
  elem.style.left = left
  elem.style.top = top
  elem.style.position = position
  return elem
}

//This functio will check if the bullet hit the chicken
const collision = (shoot, chick) => {
  // let chick = document.querySelector(`.${chicken}`)
  let chickenBoundaries = chick.getBoundingClientRect()
  let bulleBoundaries = shoot.getBoundingClientRect()
  if (
    chickenBoundaries.top <= bulleBoundaries.bottom &&
    chickenBoundaries.bottom >= bulleBoundaries.top &&
    chickenBoundaries.left <= bulleBoundaries.right &&
    chickenBoundaries.right >= bulleBoundaries.left
  ) {
    console.log('collision')
    let xAxis = chickenBoundaries.left + chickenBoundaries.width / 2
    let yAxis = chickenBoundaries.top + chickenBoundaries.height / 2
    chick.remove()
    shoot.remove()
    changeChiken(xAxis, yAxis)
  }
}

const isCollison = (shoot) => {
  let chickenElements = Array.from(chickensContainer.children)
  let collisionOccurred = false
  chickenElements.forEach((element) => {
    if (!collisionOccurred) {
      collisionOccurred = collision(shoot, element)
    }
  })
}

//This function responsible for moving the shoot
const moveShoots = (shoot) => {
  // let chickenElements = Array.from(chickensContainer.children)
  let shootInterval = setInterval(function () {
    shoot.style.top = shoot.offsetTop - 10 + 'px'

    if (shoot.getBoundingClientRect().top <= 0) {
      clearInterval(shootInterval)
      shoot.remove()
    }
    isCollison(shoot)
  }, 10)
}

//This function will remove the chicken once hit by a shoot and place a cooked chicken in his place
const changeChiken = (xAxis, yAxis) => {
  let deathChicken = newElement(
    'div',
    "url('images/cooked_chicken.png')",
    '50px',
    '25px',
    'contain',
    'no-repeat',
    `${xAxis}px`,
    `${yAxis}px`,
    'fixed'
  )

  document.body.append(deathChicken)
  cookedChickenMove(deathChicken)
}

//This function make the deathChicken to fall-down
const cookedChickenMove = (deathChicken) => {
  let moveInterval = setInterval(function () {
    deathChicken.style.top = deathChicken.offsetTop + 20 + 'px'

    if (
      deathChicken.offsetTop + deathChicken.offsetHeight >=
      document.body.offsetHeight
    ) {
      setTimeout(() => {
        clearInterval(moveInterval)
        deathChicken.remove()
      }, 1000)
    }
  }, 25)
}

const moveChickenLeft = () => {
  let moveChickenInterval = setInterval(function () {
    chickensContainer.style.left = chickensContainer.offsetLeft - 10 + 'px'

    //Stop the chicek once reach right side
    if (chickensContainer.offsetLeft <= 0) {
      clearInterval(moveChickenInterval)
      chickensContainer.style.top = chickensContainer.offsetTop + 20 + 'px'

      //Stopt he chicken once reach the bottom
      if (
        chickensContainer.offsetTop + chickensContainer.offsetHeight >=
        document.body.offsetHeight
      ) {
        clearInterval(moveChickenInterval)
      }
      moveChickenRight()
    }
  }, 50)
}

const moveChickenRight = () => {
  let moveChickenInterval = setInterval(function () {
    chickensContainer.style.left = chickensContainer.offsetLeft + 10 + 'px'

    //To stop the chicken once reach the left
    if (
      chickensContainer.offsetLeft + chickensContainer.offsetWidth >=
      document.body.offsetWidth
    ) {
      clearInterval(moveChickenInterval)
      chickensContainer.style.top = chickensContainer.offsetTop + 20 + 'px'

      //To stop the chicken once reach the bottom
      if (
        chickensContainer.offsetTop + chickensContainer.offsetHeight >=
        document.body.offsetHeight
      ) {
        clearInterval(moveChickenInterval)
      }
      moveChickenLeft()
    }
  }, 50)
}

moveChickenRight()

document.addEventListener('click', shootChicken)
