/* второй вариант на транзишен */

class ColorfullSlider {
  constructor(params) {
    this.root = document.querySelector(params.sliderRoot);
    this.sliderContainer = document.querySelector(params.sliderContainer);
    this.slides = this.sliderContainer.querySelectorAll(params.slideClass);

    this.transitionTimeSecond = params.transitionTimeSecond;
    this.currentSlide = 0;
    this.slidesCount = this.slides.length;
    this.transformMethod = params.transform;

    this.width = params.widthSliderNum;

    this.root.style.overflow = "hidden";
    this.root.style.width = this.width + "px";

    this.slides.forEach((node) => {
      node.style.width = this.width + "px";
    });

    this.sliderContainer.style.display = "flex";
    this.sliderContainer.style.width = `${this.slidesCount + 2}00%`;
    this.sliderContainer.style.transform = `translate3d(${
      this.width * -1 + "px"
    }, 0px, 0px)`;

    this.addClonedSlide();

    this.initNavigation(params.arrowsStyles);

    this.pending = false;
  }

  moveSlideTo({ dotFlag, num } /* получаем индекс слайда или инкремент */) {
    if (this.pending || (dotFlag === true && this.currentSlide === num)) {
      return false;
    }

    this.pending = true;

    if (dotFlag) {
      // если индекс то присваеваем
      this.currentSlide = num;
    } else {
      // если инкремент то вычисляем
      this.currentSlide = this.currentSlide + num;
    }

    this.setNewSlide();
  }

  setNewSlide = () => {
    this.sliderContainer.style.transition = `transform ${this.transitionTimeSecond}s cubic-bezier(0.65, 0.05, 0.36, 1)`;
    this.sliderContainer.style.transform = `translate3d(${this.getNewOffset()}, 0px, 0px)`;

    setTimeout(() => {
      this.sliderContainer.style.transition = "none";
      if (this.currentSlide < 0) {
        this.currentSlide = this.slidesCount - 1;
      } else if (this.currentSlide === this.slidesCount) {
        this.currentSlide = 0;
      }

      this.sliderContainer.style.transform = `translate3d(${this.getNewOffset()}, 0px, 0px)`;

      setTimeout(() => {
        this.unsetPending();
      }, 0);
    }, String(this.transitionTimeSecond * 1000));
  };

  addClonedSlide() {
    this.sliderContainer.appendChild(this.slides[0].cloneNode(true));
    console.log(this.slidesCount);
    this.sliderContainer.insertBefore(
      this.slides[this.slidesCount - 1].cloneNode(true),
      this.sliderContainer.firstChild
    );
  }

  unsetPending() {
    this.pending = false;
  }

  setTransitionNone() {
    this.sliderContainer.style.transition = "none";
  }

  getNewOffset = () => {
    return (this.currentSlide + 1) * (this.width * -1) + "px";
  };

  initNavigation(arrowsStyles) {
    const navigationDiv = document.createElement("div");

    this.assignStyles(navigationDiv, arrowsStyles.container);

    const leftArrow = document.createElement("div");
    this.assignStyles(leftArrow, arrowsStyles.leftArrow);
    leftArrow.addEventListener("click", () => {
      this.moveSlideTo({ dotFlag: false, num: -1 });
    });

    navigationDiv.appendChild(leftArrow);

    for (let dotIndex = 0; dotIndex < this.slides.length; dotIndex++) {
      navigationDiv.appendChild(this.getNavDot(dotIndex, arrowsStyles.dots));
    }

    const rightArrow = document.createElement("div");
    this.assignStyles(rightArrow, arrowsStyles.rightArrow);
    rightArrow.addEventListener("click", () => {
      this.moveSlideTo({ dotFlag: false, num: 1 });
    });

    navigationDiv.appendChild(rightArrow);

    this.root.appendChild(navigationDiv);
  }

  getNavDot(dotIndex, dotsStyle) {
    const navDot = document.createElement("div");

    this.assignStyles(navDot, dotsStyle);

    navDot.addEventListener("click", () => {
      this.moveSlideTo({ dotFlag: true, num: dotIndex });
    });

    return navDot;
  }

  assignStyles(node, styles) {
    for (const key in styles) {
      node.style[key] = styles[key];
    }
  }
}

window.addEventListener("load", () => {
  const newSlider = new ColorfullSlider({
    sliderRoot: ".slider-container",
    sliderContainer: ".slider-wrap",
    slideClass: ".slide",
    widthSliderNum: 1231,
    transitionTimeSecond: 1,
    arrowsStyles: {
      container: {
        bottom: "18px",
        left: "29px",
        position: "absolute",
        display: "flex",
        flexDirection: "row",
      },
      dots: {
        width: "9.5px",
        height: "9.5px",
        borderRadius: "30px",
        marginRight: "8px",
        marginLeft: "8px",
        backgroundColor: "#fff",
        cursor: "pointer",
      },
      leftArrow: {
        content: "url(./images/arrow-left.svg)",
        width: "41px",
        height: "14px",
        marginRight: "25px",
        cursor: "pointer",
      },
      rightArrow: {
        content: "url(./images/arrow-right.svg)",
        width: "41px",
        height: "14px",
        marginLeft: "25px",
        cursor: "pointer",
      },
    },
  });
});

/* вариант первый не устраивал переход от первого к последнему слайду */
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

// window.addEventListener("load", () => {
//   const slader1 = new Slider(".promos-to-slide", "ps-navigation-start-bottom");
// });
