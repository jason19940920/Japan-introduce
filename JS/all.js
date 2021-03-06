//@DOM
const search = document.querySelector('.search');
const leftLink = document.querySelector('.left-link');
const rightHeader = document.querySelector('.right-header');
const searchInput = document.querySelector('.search-input');
const cancelSearchButton = document.querySelector('.cancel-search');
const dropDown = document.querySelector('.dropdown');
const slideImage = document.querySelectorAll('.slide-image');
const slideContainer = document.querySelector('.slide-container');
const goNextImageButton = document.querySelector('#gonext-button');
const goBackImageButton = document.querySelector('#goback-button');
const navigationDots = document.querySelector('.navigation-dots');
const autoChangeImageButton = document.querySelector('.auto-change-image');
const openDropdown = document.querySelector('.open-all-microsoft');
const header = document.querySelector('header');

let counter = 1;
let flag = 1;
let numberOfImage = slideImage.length;
let slideWidth = slideImage[0].clientWidth;
let currentSlide = 0;


function init() {
    // slideImage[0] = 0
    // slideImage[1] = 100%
    slideImage.forEach((img, i) => {
        img.style.left = `${i*100}%`;
    })
    slideImage[0].classList.add('active');
    createNavigationDots();
}
init();

// create navigation dots
function createNavigationDots(){
    for(let i=0; i<numberOfImage; i++){
        const dot = document.createElement('div');
        dot.classList.add('single-dot');
        navigationDots.appendChild(dot);

        dot.addEventListener('click', () => {
            goToSlide(i);
        })
    }
    navigationDots.children[0].classList.add('active')
}

// gonext/goback button
goNextImageButton.addEventListener('click', () => {
    if(currentSlide >= numberOfImage-1){
        goToSlide(0);
        return;
    }
    currentSlide++;
    goToSlide(currentSlide);
})

goBackImageButton.addEventListener('click', () => {
    if(currentSlide <= 0){
        goToSlide(numberOfImage - 1);
        return;
    }
    currentSlide--;
    goToSlide(currentSlide);
})

//add boxshadow for header when scroll
$(window).scroll(function() {     
    var scroll = $(window).scrollTop();
    if (scroll > 0) {
        $(".header").addClass("shadow");
    }
    else {
        $(".header").removeClass("shadow");
    }
});


// slide Image
function goToSlide(slideNumber){
    slideContainer.style.transition = "0.4s ease";
    slideContainer.style.transform = `translateX(${-100*slideNumber}%`;

    currentSlide = slideNumber;
    setActiveClass();
}

// set .active
function setActiveClass() {
    // set active class for slide Image
    let currentActive = document.querySelector('.slide-image.active');
    currentActive.classList.remove('active');
    slideImage[currentSlide].classList.add('active');

    //set active class for navigation dots
    let currentDot = document.querySelector('.single-dot.active');
    currentDot.classList.remove('active');
    navigationDots.children[currentSlide].classList.add('active');
}

// auto play
let timer = 0;
let autoplay;
function startChangeImage(){
    autoplay = setInterval(() => {
        timer++;
        if(timer>3){
            timer = 0;
        }
        slideContainer.style.transition = "0.4s ease-in-out"
        slideContainer.style.transform = `translateX(${-100*timer}%`; 
        currentSlide = timer;
        setActiveClass();
        // slideContainer.style.transform = `translateX(${-100*slideNumber}%`; 
    }, 5000);
}
startChangeImage();

// play/pause slide image
function changeButtonForm() {
    if(flag === 1){
        flag = 2;
        autoChangeImageButton.innerHTML = `<i class="fas fa-play"></i>`;
        clearInterval(autoplay);
        console.log(flag);
    } else {
        startChangeImage();
        flag = 1;
        autoChangeImageButton.innerHTML = `<i class="fas fa-pause"></i>`;
    }
}

// open/close input
search.addEventListener ('click', function(){
    rightHeader.style.display = "none";
    leftLink.style.display = "none";
    searchInput.style.display = "block";
});
cancelSearchButton.addEventListener('click', function(){
    rightHeader.style.display = "block";
    leftLink.style.display = "block";
    searchInput.style.display = "none";
})

// open/close dropdown menu
let openall = 1;
function openAllMicrosoft(){
    if(openall === 1){
        dropDown.style.display = 'flex';
        openall = 2;
    } else {
        dropDown.style.display = 'none';
        openall = 1;
    }
    
}

