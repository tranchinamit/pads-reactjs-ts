import * as React from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";

import App from './App';
import Footer from "./component/Footer";
import Header from "./component/Header";

import AdsDetails from "./container/AdsDetails";
import Home from "./container/Home";
import ListAds from "./container/ListAds";
import Profile from "./container/Profile";

export const AppRouter: React.StatelessComponent<{}> = () => {

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}



// class AppRouter extends React.Component<any, any> {

//   public readonly state = {
//     isReload: true,
//   };
//   constructor(props: any) {
//     super(props);

//     this.recieveData = this.recieveData.bind(this);
//   }

//   public recieveData(dataFromHeader?: any) {
//     const e = dataFromHeader;
//     console.log(e);
//   }

//   public render() {
//     return (
//       <BrowserRouter>
//         <div>
//           <Route component={Header} dataSearch={`abc`}/>
//           <Switch>
//             <Route exact={true} path="/" component={Home} />
//             <Route path="/ads-details" component={AdsDetails} />
//             <Route path="/profile" component={Profile} />
//             <Route path="/list-ads" component={ListAds} isReload={true} />
//             {/* <Route path='/list-ads' render={() => <ListAds isReload={true} />} /> */}
//           </Switch>
//           <Route component={Footer} />
//         </div>
//        </BrowserRouter>
//     );
//   }
// }

// export default AppRouter;
