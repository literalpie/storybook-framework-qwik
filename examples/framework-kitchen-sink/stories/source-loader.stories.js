import button from './button.html';

const packageName = './button.html';
const componentSubtitle = `import button from '${packageName}/lib/elements/buttons';`;

export default {
  title: 'Addons/Source loader',
  parameters: {
    componentSubtitle,
  },
};

export const Button = () => button;
Button.story = {
  parameters: {
    storySource: {
      source: button,
    },
  },
};

export const SimpleStory = () =>
  `<p>
      <strong>
        This is a fragment of HTML
      </strong>
    </p>`;
SimpleStory.story = {
  name: 'Very simple story',
};
