class Slider {
  constructor(rootSliderClass, navigationPositionClass) {
    this.rootSliderNode = document.querySelector(rootSliderClass);

    if (!this.rootSliderNode) {
      throw Error("Нет родительского блока");
    }

    this.rootSliderNode.classList.add("slider-container");

    this.slides = [...this.rootSliderNode.children];

    if (!this.slides) {
      throw Error("Нет дочерних элементов");
    }

    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].classList.add("slide");
    }

    this.currentSlide = 0;

    this.initNavigation(navigationPositionClass);
  }

  initNavigation(navigationPositionClass) {
    const navigationDiv = document.createElement("div");

    if (navigationPositionClass) {
      console.log(navigationPositionClass.replace(".", ""));
      navigationDiv.classList.add(navigationPositionClass.replace(".", ""));
    }
    navigationDiv.classList.add("ps-navigation-bottom-center");

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

    this.slides[0].style.marginLeft = newMargin;
  }
}

//const slader = new Slider(".promos-to-slide", "navigation-right-end");

window.addEventListener("load", () => {
  console.log("iuhgu");
  const slader1 = new Slider(".promos-to-slide", "ps-navigation-start-bottom");
});
