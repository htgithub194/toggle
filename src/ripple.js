var timer_debounce = null;

const addRipple = function (e) {
  var ripple = this,
    size = ripple.offsetWidth,
    pos = ripple.getBoundingClientRect(),
    rippler = document.createElement('span'),
    x = e.pageX - pos.left - (size / 2),
    y = e.pageY - pos.top - (size / 2),
    style = 'top:' + y + 'px; left:' + x + 'px; height: '
      + size + 'px; width: ' + size + 'px;';
  ripple.rippleContainer.appendChild(rippler);
  console.log("Size: ", size);
  rippler.setAttribute("style", style);
};

const cleanUp = function () {
  timer_debounce = null;
  var container = this.rippleContainer;
  while (this.rippleContainer.firstChild) {
    container.removeChild(container.firstChild);
  }
};

const debounce = function () {
  if (null !== timer_debounce) {
    clearTimeout(timer_debounce);
  }
  timer_debounce = setTimeout(cleanUp.bind(this), 2000);
}

const initRipple = function () {

  var ripples = document.querySelectorAll(".ripple");
  var rippleContainer, ripple;

  for (let i = 0, len = ripples.length; i < len; i++) {
    ripple = ripples[i];
    rippleContainer = document.createElement('div');
    rippleContainer.className = 'ripple--container';
    ripple.addEventListener('mousedown', addRipple);
    ripple.addEventListener('mouseup', debounce);
    ripple.rippleContainer = rippleContainer;
    ripple.appendChild(rippleContainer);
  }

}