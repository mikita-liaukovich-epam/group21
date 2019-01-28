import { $$, inner } from '../../utils';
import { getTemplate } from './poets.template';
import { mainBody } from '../main/main.template';
import './poets.css';

$$('body').addEventListener('click', e => {
  const el = e.target;
  const elClass = el.getAttribute('class');
  if (elClass === 'home') {
    $$('body').innerHTML = '';
    inner($$('body'), mainBody());
  }
});

export function showPoet(name){
  $$('body').innerHTML = getTemplate(name);
}

export const addPoetsLinks = function addPoetsLinks() {
  $$('.content').addEventListener('click', e => { showPoet(e.target.dataset.name) })
}