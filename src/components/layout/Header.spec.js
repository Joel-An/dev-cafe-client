import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

function setup() {
  const props = {
    profileName: 'aadad',
  };
  const wrapper = shallow(<Header/>);
  return { wrapper, props };
}

describe('Header', () => {
  it.skip('Should have a Link', () => {
    const { wrapper } = setup();
    expect(wrapper.find('Link').exists()).toBe(true);
  });
});
