// carousel.js
function generateDotsCarousel(count) {
    let result = "";
    for (let i = 0; i < count; i++) {
      result += `<div class="bg-red-500 w-4 h-4 bradius-50 opacity-20"></div>`;
    }
    return result;
  }
  
  function map(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
  
  const scrollOpts = {
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  };
  
  export class Carousel {
    /**
     * @param {HTMLElement} containerEl  The scrollable container
     * @param {HTMLElement} dotsEl       The element in which to render dots
     */
  
    constructor(containerEl, dotsEl) {
      this.container = containerEl;
      this.dotsContainer = dotsEl;
      this.previousIndex = 0;
      this.opacity = "!opacity-100";
      this.dotsStyle = "flex gap-1 hover:cursor-pointer justify-center".split(/\s+/);
    }
  
    init() {
      this.dotsContainer.classList.add(...this.dotsStyle);
      this.items = Array.from(this.container.children);
      // console.log("debug carousel module " + this.items.length);
      if (this.items.length == 0) {
        return;
      }
      this.dotsContainer.innerHTML = generateDotsCarousel(this.items.length);
      this.container.children.item(this.previousIndex).scrollIntoView(scrollOpts);
      this.dotsContainer.children
        .item(this.previousIndex)
        .classList.add(this.opacity);
      Array.from(this.dotsContainer.children).forEach((dot, index) => {
        dot.addEventListener("click", () => {
          this.container.children.item(index).scrollIntoView(scrollOpts);
        });
      });
      var nScrolls = this.items.length - 1;
      this.container.addEventListener("scroll", (event) => {
        var index = Math.round(
          map(
            this.container.scrollLeft,
            0,
            this.container.clientWidth,
            0,
            nScrolls
          ) / nScrolls
        );
  
        if (this.previousIndex === index) {
          return;
        }
        this.dotsContainer.children.item(this.previousIndex).classList.remove(this.opacity);
        this.dotsContainer.children.item(index).classList.add(this.opacity);
        this.previousIndex = index;
      });
    }
  }
  