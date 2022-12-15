import { document } from 'global';

export default {
  component: () => {
    const btn = (document as Document).createElement('button');
    btn.innerText = 'Button';
    const div = (document as Document).createElement('div');
    div.innerText = 'Hello world! Look at that button!';
    div.appendChild(btn);
    return div;
  },
};

export const Primary = {};
