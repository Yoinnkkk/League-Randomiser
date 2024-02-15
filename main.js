const {random, floor} = Math

const abilities = document.getElementById('abilities'),
wheel = document.getElementById('wheel')

let slotsUsed = {
    'P': false,
    'Q': false,
    'W': false,
    'E': false,
    'R': false,
    'i': 0
},
champions,
currentChamp;

fetch('champions.json').then((response) => response.json()).then((data) => {
    champions = Object.keys(data.data)
    
    newRoll(champions)
    
})

function newRoll() {
    const championCount = champions.length
    currentChamp = champions[floor(random()*(championCount))]

    // Display champion icon on screen in the wheel selector for now
    let display = document.createElement('img')
    display.src = `images/squares/${currentChamp}.png`
    display.classList.add('championSquare')
    wheel.appendChild(display)
}

let animation = new Animation();

function selectAbility(ability) {
    let imageHolder = document.getElementById(ability),
    image = wheel.getElementsByTagName('img')[0]
    document.getElementById('reset').disabled = false

    if (slotsUsed[ability] == false) {
        if (animation.playState == 'running') return
        // Animation
        let newChild = image.cloneNode()
        newChild.style.visibility = "hidden"
        imageHolder.appendChild(newChild)
        let newOffset = newChild.getBoundingClientRect(),
        oldOffset = image.getBoundingClientRect()
        

        image.style.position = "absolute"
        image.style.left = oldOffset.left + "px"
        image.style.top = oldOffset.top + "px"
        image.style.zIndex = 1000

        animation = image.animate([
            { top: newOffset.top + "px", left: newOffset.left + "px", height: newOffset.height + "px"}
        ], {
            duration: 1000,
            easing: 'ease'
        })
        animation.onfinish = (event) => {
            imageHolder.removeChild(newChild)
            image.style.position = "static"
            imageHolder.appendChild(image)
        }
        //Actual functionality
        
        if (slotsUsed['i'] < 4) newRoll()
        slotsUsed[ability] = true
        slotsUsed['i'] +=1 
    }
    

}

function reset() {
    slotsUsed = {
        'P': false,
        'Q': false,
        'W': false,
        'E': false,
        'R': false,
        'i': 0
    }

    // Animation



    // Actual Functionality
    Object.keys(slotsUsed).forEach(element => {
        if (element === 'i') return
        element = document.getElementById(element)
        element.removeChild(element.getElementsByTagName('img')[0])
    });
    newRoll()
}




// Implement Drag and Drop

// function mouseDownEvent(event) {
//     let initX = event.clientX,
//     initY = event.clientY,
//     draggableElement = document.getElementsByClassName("draggable")[0]

//     function moveElement(event) {
//         let deltaX = event.clientX - initX,
//         deltaY = event.clientY - initY

//         draggableElement.style.position = "absolute"
//         draggableElement.style.left = draggableElement.offsetLeft + deltaX + 'px';
//         draggableElement.style.top = draggableElement.offsetTop + deltaY + 'px';

//         initX = event.clientX
//         initY = event.clientY
//     }
    
//     function stopElement() {
//         document.removeEventListener('mousemove', moveElement);
//         document.removeEventListener('mouseup', stopElement);
//     }

//   document.addEventListener('mousemove', moveElement);
//   document.addEventListener('mouseup', stopElement);
// }