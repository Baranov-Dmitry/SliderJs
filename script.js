class Slider {
  constructor(rootSliderClass, navigationPositionClass) {
    this.rootSliderNode = document.querySelector(rootSliderClass);
    this.slides = [...this.rootSliderNode.children];

    if (!this.rootSliderNode || !this.slides) {
      throw Error("Нет родительского класса или дочерних элементов");
    }

    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].classList.add("slide");
    }

    this.currentSlide = 0;

    this.initNavigation(navigationPositionClass);
  }

  initNavigation(navigationPositionClass) {
    const navigationDiv = document.createElement("div");

    if (!navigationPositionClass) {
      navigationDiv.classList.add(this.navigationClass.replace(".", ""));
    } else {
      navigationDiv.classList.add("ps-navigation-bottom-center");
    }

    navigationDiv.appendChild(this.createArrow("arrow-left", -1));

    for (let dotIndex = 0; dotIndex < this.slides.length; dotIndex++) {
      navigationDiv.appendChild(this.getNavDots(dotIndex));
    }

    navigationDiv.appendChild(this.createArrow("arrow-right", 1));

    this.rootSliderNode.appendChild(navigationDiv);
  }

  getNavDots(dotIndex) {
    const navDot = document.createElement("div");
    navDot.classList.add("slader-navigation__dot");
    navDot.addEventListener("click", () => {
      this.navigateToSlide(dotIndex);
    });
    return navDot;
  }

  createArrow(className, slideIterator) {
    const div = document.createElement("div");
    div.classList.add(className);
    div.addEventListener("click", () => {
      this.increaseOrDercireSlide(slideIterator);
    });
    return div;
  }

  increaseOrDercireSlide(num) {
    let newSlideNum = this.currentSlide + num;

    console.log(num);
    console.log(this.currentSlide);
    console.log(newSlideNum);

    if (newSlideNum < 0) {
      newSlideNum = this.slides.length - 1;
    } else if (newSlideNum > this.slides.length - 1) {
      newSlideNum = 0;
    }

    this.navigateToSlide(newSlideNum);
  }

  navigateToSlide(id) {
    console.log(id);
    this.currentSlide = id;
    let newMargin = "0";
    if (id !== 0) {
      newMargin = `-${id * 100}%`;
    }
    console.log(newMargin);
    this.slides[0].style.marginLeft = newMargin;
  }
}

const arrowLeft = document.querySelector(".slader-navigation__arrow-left");
const arrowRight = document.querySelector(".slader-navigation__arrow-right");
const firstSlide = document.querySelector(".image-container > img:first-child");

// arrowLeft.addEventListener("click", () => {
//   firstSlide.style.marginLeft = "-100%";
// });
// arrowRight.addEventListener("click", () => {
//   firstSlide.style.marginLeft = "0";
// });

const slader = new Slider(".image-container", "navigation-right-end");

console.log(slader);
