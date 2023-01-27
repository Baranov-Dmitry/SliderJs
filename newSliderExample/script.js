class ColorfullSlider {
  constructor(params) {
    this.root = document.querySelector(params.sliderRoot);
    this.sliderContainer = document.querySelector(params.sliderContainer);
    this.slides = this.sliderContainer.querySelectorAll(".slide");

    this.transitionTimeSecond = params.transitionTimeSecond;
    this.currentSlide = 0;
    this.slidesCount = this.slides.length;
    this.transformMethod = params.transform;

    this.root.style.overflow = "hidden";
    this.root.style.width = params.widthSliderNum + "px";

    this.slides.forEach((node) => {
      node.style.width = params.widthSliderNum + "px";
    });

    this.sliderContainer.style.display = "flex";
    this.sliderContainer.style.width = `${this.slidesCount + 2}00%`;
    this.sliderContainer.style.transform = `translate3d(${
      params.widthSliderNum * -1 + "px"
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
    return (this.currentSlide + 1) * -500 + "px";
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

const sliderParams = {
  sliderRoot: ".slider-container",
  sliderContainer: ".slider-wrap",
  widthSliderNum: 500,
  transitionTimeSecond: 0.5,
  arrowsStyles: {
    container: {
      top: "10px",
      right: "10px",
      margin: "10px",
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
      cursor: "pointer",
    },
    rightArrow: {
      content: "url(./images/arrow-right.svg)",
      width: "41px",
      height: "14px",
      cursor: "pointer",
    },
  },
};

const newSlider = new ColorfullSlider(sliderParams);
