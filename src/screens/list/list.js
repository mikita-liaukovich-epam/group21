import BigPicture from 'bigpicture';
import { $$, addClass, inner, sleep } from '../../utils';
import template from './list.template';
import templateMain from '../main/main.template';
import './list.css';

$$('body').addEventListener('click', e => {
  const el = e.target;
  const elClass = el.getAttribute('class');
  if (elClass === 'main-button left') {
    addClass($$('.logo'), 'logo-anim-to-top');
    sleep(200).then(() => {
      $$('body').innerHTML = '';
      inner($$('body'), template);
    });
  }
  if (elClass === 'close') {
    addClass($$('.logotype'), 'logo-anim-to-bottom');
    sleep(200).then(() => {
      $$('body').innerHTML = '';
      inner($$('body'), templateMain);
    });
  }
  if (elClass === 'list-poets') {
    $$('body').innerHTML = '';
    inner($$('body'), template);
  }
  if (elClass === 'youtube') {
    BigPicture({
      el: e.target,
      ytSrc: e.target.getAttribute('ytsrc'),
    });
  }
});