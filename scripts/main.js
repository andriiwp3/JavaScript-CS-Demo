'use strict';

const checkIfElementIsInViewport = (selector) => {
    const element = document.querySelector(selector);
    const bounding = element.getBoundingClientRect();
    
    if (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
        console.log('Element is in the viewport!');
    } else {
        console.log('Element is NOT in the viewport!');
    }
}

const typeStrings = (element, strings, options = {}) => new Typed(element, { strings, showCursor: false, ...options });

const counterAnim = (qSelector, start = 0, end, duration = 1000) => {
    const target = document.querySelector(qSelector);
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;

        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        target.innerText = Math.floor(progress * (end - start) + start);
        
        if (progress < 1) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
};

const typeGreetings = () => {
    typeStrings('.greetings__title', ['Crack into ^1000 JavaScript'])
    typeStrings('.greetings__subtitle', ['CS Presentation ^300--author="Andrew Herchykov"'], { startDelay: 2000 })
    typeStrings('.greetings__button', ['Get', 'Started', 'Get Started ^500', 'Press button or scroll down to start'], { startDelay: 3000, showCursor: true })
}

const showNumber1 = () => {
    counterAnim("#number_1", 0, 28, 1000);
    typeStrings('.number-1 .section__description', ['^1000years on the market 📊'])
}

const showNumber2 = () => {
    counterAnim("#number_2", 0, 17.4, 1500);
    typeStrings('.number-2 .section__description', ['^1000million developers 👨‍💻'])
}

const showNumber3 = () => {
    counterAnim("#number_3", 56800, 57500, 2000);
    typeStrings('.number-3 .section__description', ['^1000The average salary for Javascript Developer jobs in the UK 💸'])
}

const sectionsAnimation = {
    firstSection: false,
    eighthSection: false
}

const initializeFullPageSlider = () => {
    const myFullpage = new fullpage('#fullpage-container', {
        sectionsColor: ['#7fc5b7', '#348899', '#F2AE72', '#5C832F', '#B8B89F'],
        sectionSelector: '.vertical-scrolling',
        slideSelector: '.horizontal-scrolling',
        navigation: true,
        slidesNavigation: true,
        controlArrows: true,
        anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection', 'sixthSection', 'seventhSection', 'eighthSection', 'ninthSection'],
        onLeave: function(index, nextIndex, direction) {
            if (nextIndex.anchor === 'firstSection' && !sectionsAnimation.firstSection) {
                typeGreetings
                sectionsAnimation.firstSection = true;
            }
            if (nextIndex.anchor === 'eighthSection' && !sectionsAnimation.eighthSection) {
                showNumber1();
                showNumber2();
                showNumber3();
                sectionsAnimation.eighthSection = true;
            }
        }
      });
}


const start = () => {
    initializeFullPageSlider()
};

document.addEventListener('DOMContentLoaded', start)