import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Footer from "./component/Footer";
import Header from "./component/Header";

import AdsDetails from "./container/AdsDetails";
import Home from "./container/Home";
import ListAds from "./container/ListAds";
import Profile from "./container/Profile";

// import * as jQuery from 'jquery';

// import './assets/js/popper.js';

// import './assets/bootstrap/js/bootstrap.js';

class App extends React.Component<any, any> {

  public readonly state = {
    dataSearch: {}
  };

  constructor(props: any) {
    super(props);

    this.recieveData = this.recieveData.bind(this);
  }

  public recieveData(dataFromHeader?: any) {
    const e = dataFromHeader;
    // console.log(e);
    this.setState({
      dataSearch: e
    });
  }
  public render() {
    return (
      <div>
        <Header dataSearch={this.recieveData} />
        {/* <Route render={() => <Header dataSearch={this.recieveData} />}/> */}
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/ads-details" component={AdsDetails} />
          <Route path="/profile" component={Profile} />
          {/* <Route path="/lis-ads" component={ListAds}/> */}
          <Route path='/list-ads' render={(props) => <ListAds {...props} data={this.state.dataSearch}/>} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
