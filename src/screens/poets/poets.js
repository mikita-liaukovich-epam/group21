import { $$, inner, remove } from '../../utils';
import poets from "./poets.json";
import template from './poets.template';
import './poets.css';

$$('.testbutton').onclick = () => {
  let currentPoet = poets['kolas'];
  console.log(currentPoet);
};