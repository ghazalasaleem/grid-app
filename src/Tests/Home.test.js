import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../Components/Home/Home';

describe('Home Component', () =>{
  let home;
  
    beforeAll(() => {
      home = renderer.create(<Home/>);
    });
    afterAll(() => {
      home = null;
    });
     
    test('renders', () => {
      expect(home).toBeDefined();
      expect(home).toMatchSnapshot();
    });

    xtest('text displayed',() => {
      expect(home.value).toEqual('Simple Application to learn React');
    });
});

