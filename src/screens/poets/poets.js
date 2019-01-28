import { $$, inner, remove } from '../../utils';
import poets from "./poets.json";
import { getTemplate  } from './poets.template';
import templateMain from '../main/main.template';
import './poets.css';

$$('body').addEventListener('click', e => {
  const el = e.target;
  const elClass = el.getAttribute('class');
  if (elClass === 'home') {
    $$('body').innerHTML = '';
    inner($$('body'), templateMain);
  }
});

function showPoet(name){
  $$('body').innerHTML = getTemplate(name);
}

export function addPoetsLinks() {
  $$('.content').addEventListener('click', (e) => {showPoet(e.target.dataset.name)})
}