import { $$, inner, remove } from '../../utils';
import template from './main.template';
import './main.css';

inner($$('body'), template);

$$('.search-string').onblur = () => {
  $$('.search-string').value = '';
}

$$('.active-lang').onclick = () => {
  $$('.languages').style.display = 'block';
};

$$('.eng').onclick = event => {
  const target = event.target;
  remove($$('.languages'), $$('.eng'));
  $$('.languages').insertBefore(target, $$('.languages img'));
  $$('.active-lang').src = './assets/ENG.png';
  $$('.languages').style.display = 'none';
};

$$('.bel').onclick = event => {
  const target = event.target;
  remove($$('.languages'), $$('.bel'));
  $$('.languages').insertBefore(target, $$('.languages img'));
  $$('.active-lang').src = './assets/BEL.png';
  $$('.languages').style.display = 'none';
};

$$('.rus').onclick = event => {
  const target = event.target;
  remove($$('.languages'), $$('.rus'));
  $$('.languages').insertBefore(target, $$('.languages img'));
  $$('.active-lang').src = './assets/RUS.png';
  $$('.languages').style.display = 'none';
};