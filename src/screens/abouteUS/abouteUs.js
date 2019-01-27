import { $$, inner } from '../../utils';
import template from './about.template';
import './aboutUs.css';

$$('body').addEventListener('click', e => {
  const el = e.target;
  const elClass = el.getAttribute('class');
  if (elClass === 'abouteUs') {
    $$('body').innerHTML = '';
    inner($$('body'), template);
  }
});