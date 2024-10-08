"use strict";

///////////////////////////////////////
// Modal window
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");
const dotContainer = document.querySelector(".dots");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

/* Old School
  for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);
 */
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//smooth Scroll
btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log("Current Scroll (X/Y)", window.pageXOffset, pageYOffset);
  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  //   );
  // });
  // window.scrollTo({

  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: "smooth" });
});

// Page Navigation

// const navLinks = document.querySelectorAll('.nav__link');
// // console.log(navLinks)
// navLinks.forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     const id2 = this.href;
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' })

//     /* console.log(id);
//     console.log(id2);
//     console.log('link'); */
//   });
// });

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    const id2 = this.href;
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    console.log("lol");
  }
});

//Tabbed Component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);
  if (!clicked) return;
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");
  console.log(clicked.dataset.tab);
  tabContent.forEach((con) =>
    con.classList.remove("operations__content--active")
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    console.log(link);
    const sibilings = link.closest("nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    sibilings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Menu Fade Animation
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5)
// })

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1)
// })

// Sticky navigation: Intersection Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach(el => console.log(el))
// }
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect();
const obsCallback = function (entries) {
  entries.forEach((el) => {
    if (!el.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  });
};

const obsOption = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight.height}px`,
};

const headerObserver = new IntersectionObserver(obsCallback, obsOption);
headerObserver.observe(header);
// section--hidden
// Revel Section
const allSections = document.querySelectorAll("section");
const revealSection = function (entries, observe) {
  const [entry] = entries;
  // console.log(entry)
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observe.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden')
});

// Lazy Loading Images
const imgTarget = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entery] = entries;
  // console.log(entery)
  if (!entery.isIntersecting) return;
  entery.target.src = entery.target.dataset.src;
  entery.target.addEventListener("load", function () {
    entery.target.classList.remove("lazy-img");
  });
  observer.unobserve(entery.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTarget.forEach((img) => imgObserver.observe(img));

// slider

const slider = document.querySelector(".slider");
// slider.style.transform = "scale(0.4) translateX(-800px)";
// slider.style.overflow = "visible";

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

// slides.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`);
const maxSlide = slides.length;
const goToSlide = function (slide = 0) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
let currSlide = 0;
goToSlide();

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></>`
    );
  });
};

createDots();

const activeDots = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

activeDots(0)

const nextSlide = function () {
  /* 
  currSlide++;
  if (currSlide > maxSlide - 1) return; 
 */
  if (currSlide === maxSlide - 1) {
    currSlide = 0;
  } else currSlide++;

  goToSlide(currSlide);
  activeDots(currSlide)
};

const prevSlide = function () {
  if (currSlide === 0) {
    currSlide = maxSlide - 1;
  } else currSlide--;

  goToSlide(currSlide);
  activeDots(currSlide)
};
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

// Add Keys
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  e.key === "ArrowLeft" && prevSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activeDots(slide)
  }
});

// Try make image slider not working utill intrescting is true
/* const sliderobsv = function (entries, observe) {
  const [entery] = entries
  console.log(entery);
  if (!entery.isIntersecting) return;
  if (entery.target.id === 'section--3' && entery.isIntersecting === true) {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') nextSlide();
      e.key === 'ArrowLeft' && prevSlide();
    })
  }
  observe.unobserve(entery.target);


}
const sliderObserve = new IntersectionObserver(sliderobsv, {
  root: null,
  threshold: 0.1,
})
allSections.forEach(el => sliderObserve.observe(el))
 */

// document.addEventListener('keydown', function (e) {
//   if (e.key === 'ArrowRight') nextSlide();
//   e.key === 'ArrowLeft' && prevSlide();
// })
// const header = document.querySelector('.header');
// const navHeight = nav.getBoundingClientRect().height;

// const stickyNav = function (entries) {
//   const [entry] = entries;
//   // console.log(entry);

//   if (!entry.isIntersecting) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// };

// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// });

// headerObserver.observe(header);

// ///////////////////////////////////////
// // Reveal sections
// const allSections = document.querySelectorAll('.section');

// const revealSection = function (entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;

//   entry.target.classList.remove('section--hidden');
//   observer.unobserve(entry.target);
// };

// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.15,
// });

// allSections.forEach(function (section) {
//   sectionObserver.observe(section);
//   section.classList.add('section--hidden');
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/*//*/ ///////////////////////////////////////////////////////////////////////////////////////////////////
/* const header = document.querySelector('.header')
const message = document.createElement('div');
console.log(message);
message.classList.add('cookie-messagee');
// message.textContent = 'We Use Cokkid For Improved Functionality and Analytics';
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// 'We Use Cokkid For Improved Functionality and Analytics. <button class="btn btn--close-cookie">Got It</button>';
console.log(message);
// header.prepend(message)
header.append(message)
// header.append(message.cloneNode(true))
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  // message.remove();
  message.parentElement.removeChild(message)
})

message.style.backgroundColor = '#37383d'
message.style.width = '120%'
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
document.documentElement.style.setProperty('--color-primary', 'blue');

const logo = document.querySelector('.nav__logo');
console.log(logo.alt)
console.log(logo.src)
console.log(logo.className)
logo.alt = 'lol';
 */
// logo.setAttribute('alt', 'lolads')
// console.log(logo.getAttribute('alt'));

// const h1 = document.querySelector('h1');
// const mh = function (e) {
//   alert('addEventListener :D ');
//   // h1.removeEventListener('mouseenter', mh);
// };

// h1.addEventListener('mouseenter', mh);

// setTimeout(() => h1.removeEventListener('mouseenter', mh), 3000);

// h1.onclick = function (e) {
//   alert('trash')
// }

/* Propagation

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor(0, 255));
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Link', e.target, e.currentTarget);
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//   },
//   true
// );*/

// const h11 = document.querySelector('h1');
// // Going downwards: Child
// console.log(h11.querySelectorAll('.highlight'))
// console.log(h11.childNodes)
// console.log(h11.children[2])
// console.log(h11.firstChild);
// h11.firstElementChild.style.color = 'blue'
// // Goinf upwards:parents
// console.log(h11.parentNode)
// console.log(h11.parentElement)
// console.log(h11.offsetParent)
