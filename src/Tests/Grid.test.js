import React from 'react';
import renderer from 'react-test-renderer';
import Grid from '../Components/Grid/Grid';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
describe('Grid Component', () =>{
  let grid;
  
    beforeAll(() => {
      grid = renderer.create(<Grid/>).toJSON();
    });
    afterAll(() => {
      grid = null;
    });
     
    test('Grid renders', () => {
      expect(grid).toBeDefined();
      expect(grid).toMatchSnapshot();
    });

    test('with props', () => {

    });
});

