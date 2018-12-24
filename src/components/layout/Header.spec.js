import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

function setup() {
  const props = {
    imgPath: 'some/image/path/to/a/mock/image',
  };
  const wrapper = shallow(<Header token="aadad"/>);
  return { wrapper, props };
}

describe('Header', () => {
  it('Should have a Link', () => {
    const { wrapper } = setup();
    expect(wrapper.find('Link').exists()).toBe(true);
  });
});
