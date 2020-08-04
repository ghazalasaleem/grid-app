import React from 'react';
import renderer from 'react-test-renderer';
import Dashboard from '../Components/Dashboard/Dashboard';
import TableConfig from '../Datastore/tableConfig';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Dashboard Component', () =>{
  let dashboard;
  
    beforeAll(() => {
      dashboard = renderer.create(<Dashboard/>);
    });
    afterAll(() => {
      dashboard = null;
    });
     
    test('renders', () => {
      expect(dashboard.toJSON()).toMatchSnapshot();
    });
  
    xtest('renders with config ', () => {
      // let wrapper = shallow(<Dashboard/>);
      // wrapper.instance().setTableConf(TableConfig);
    //   dashboard.TableConf = [{
    //     name: "dfs",
    //     key: 34,
    //     sort: true,
    //     show: true
    // }];
      // expect(dashboard).toMatchSnapshot();
    });
});

