import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Info } from '../../components/Info';
import jsdomReact from '../jsdomReact';

function setup() {
  const props = {
    dispatch: expect.createSpy(),
    store: { info: { message: '' }},
    updateInfo: expect.createSpy()

  };

  const component = TestUtils.renderIntoDocument(<Info {...props} />);
  return {
    props,
    component,
    buttons: TestUtils.scryRenderedDOMComponentsWithTag(component, 'button').map(button => {
      return button.getDOMNode();
    }),
    input: TestUtils.scryRenderedDOMComponentsWithTag(component, 'input').map(input => {
      return input.getDOMNode();
    }),
  };
}

describe('components', () => {
  jsdomReact();

  describe('Info', () => {
    it('should update state when input is updated', () => {
      const { input } = setup();
      TestUtils.Simulate.change(input[0], {target: {value: 'new value'}});
      expect(input[0].value).toEqual('new value');
    });

    it('should call the update info action when submit button clicked', () => {
      const { buttons, props } = setup();
      TestUtils.Simulate.click(buttons[0]);
      expect(props.updateInfo).toHaveBeenCalled();
    });
  });
});
