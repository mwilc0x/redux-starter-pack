import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Root } from '../../containers/Root';
import jsdomReact from '../jsdomReact';

function setup() {

  let props = {
    dispatch: expect.createSpy(),
    fetchInfo: expect.createSpy(),
    infoStore: { info: { message: '' }},
    updateInfo: expect.createSpy()
  };

  const component = TestUtils.renderIntoDocument(<Root {...props} />);
  return {
    props,
    component,
    h1: TestUtils.scryRenderedDOMComponentsWithTag(component, 'h1').map(h1 => {
      return h1.getDOMNode();
    }),
    Info: TestUtils.scryRenderedDOMComponentsWithClass(component, 'info').map(Info => {
      return Info.getDOMNode();
    }),
  };
}

describe('containers', () => {
  jsdomReact();

  describe('Root', () => {
    it('should have a title', () => {
      const { h1, props } = setup();
      expect(h1[0].textContent).toEqual('Root Container');
    });

    it('should render an Info component', () => {
      const { Info, props } = setup();
      expect(Info[0]).toExist();
    });

  });
});
