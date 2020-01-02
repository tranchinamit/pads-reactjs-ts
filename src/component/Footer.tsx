import * as React from 'react';

class Footer extends React.Component {
  public render() {
    return (
      <section className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-3 col-12">
              <div className="footer-title">
                About us
              </div>
              <div className="footer-index">
                <ul className="list">
                  <li><a href="#">About <span className="website-name">PADS</span></a></li>
                  <li><a href="#"><span className="website-name">PADS</span> for Bussiness</a></li>
                  <li><a href="#">Our Partners</a></li>
                  <li><a href="#">Press Contact</a></li>
                  <li><a href="#">Careers</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-3 col-12">
              <div className="footer-title">
                Help & Contact
              </div>
              <div className="footer-index">
                <ul className="list">
                  <li><a href="#">FAQ's</a></li>
                  <li><a href="#">Safety Advice</a></li>
                  <li><a href="#">Help Me Guides</a></li>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">Insurance</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-3 col-12">
              <div className="footer-title">
                More From Us
              </div>
              <div className="footer-index">
                <ul className="list">
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Car Price Index</a></li>
                  <li><a href="#">Car Guides - The Inside Track</a></li>
                  <li><a href="#">Upcycle Revolution</a></li>
                  <li><a href="#">Popular Searches</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-3 col-12">
              <div className="footer-title">
                Mobile Apps
              </div>
              <div className="footer-index">
                <ul className="list">
                  <li><a href="#"><img src={require('../assets/images/ios-app.png')} alt="ios"/></a></li>
                  <li><a href="#"><img src={require('../assets/images/android-app.png')} alt="android"/></a></li>
                  <li><a href="#">More About Our Apps</a></li>
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div className="copy-right">
            <div className="item-left">
              @Copy right 2018. Thesis of Tran Chi Nam & Nguyen Thi Nhu Huynh
            </div>
            <div className="item-right">
              Follow us
              <i className="icon-facebook" />
              <i className="icon-twitter" />
              <i className="icon-linkedin2" />
              <i className="icon-google-plus" />
              <i className="icon-github" />
            </div>
          </div>
        </div>
      </section>

    );
  }
}

export default Footer;