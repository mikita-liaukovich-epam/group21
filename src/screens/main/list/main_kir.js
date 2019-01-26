import { $$, inner } from '../../../utils';
import template from './main_kir.template';
import './main_kir.css';

$$('.main-button.left').onclick = () => {
  $$('body').innerHTML = '';
  inner($$('body'), template);
};
