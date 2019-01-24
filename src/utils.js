export const $$ = el => document.querySelector(el);
export const addAttr = (el, attrs) => {
  for (const name in attrs) {
    el.setAttribute(name, attrs[name]);
  }
};
export const addClass = (el, className) => (el.classList.add(className), el);
export const append = (parent, child) => (parent.appendChild(child), parent);
export const create = el => document.createElement(el);
export const inner = (el, text) => (el.innerHTML += text, el);
export const pause = time => new Promise(resolve => {
  setTimeout(() => {
    resolve();
  }, time);
});
export const remove = (parent, child) => (parent.removeChild(child), parent);
export const setId = (el, newId) => (el.id = newId, el);
export const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds))
