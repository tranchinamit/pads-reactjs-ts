import * as React from "react";

import Breadcrumb from "../component/Breadcrumb";
import Navigation from "../component/Navigation";

import { AdsDTO } from 'src/models/ads.model';
import { ProfileDTO } from 'src/models/profile.model';

import * as queryString from 'query-string';
import { Link } from 'react-router-dom';


class AdsDetails extends React.Component {

  public readonly props: {location: { search: string}};
  public readonly state = {
    ads: new AdsDTO(),
    profile: new ProfileDTO()
  };

  public id: string;  
  public cateId: number;
  public cateName: string;
  public subCateName: string;
  
  public readonly noAvatar =  `https://static.chotot.com.vn/imaginary/f3828794a0c27a238ad00e80153801d6790e57d0/profile_avatar/e8f2cfa6986a75b52ee81a75eee12469a0ad1532/thumbnail?width=160`;

  constructor(props: any) {
    super(props); 
    this.id = String(queryString.parse(this.props.location.search).id);
    console.log(this.id);

    this.getAdsDetails(parseInt(this.id, 10));
    this.nothing = this.nothing.bind(this);
  }

  public nothing(dataFromChild?: any) {
    console.log(`nothing`);
  }

  public render() {
    const ads = this.state.ads;
    const profile = this.state.profile;
    return (
      <div>
        <Navigation callFromListAds={this.nothing}/>
        <section className="content">
          <div className="container">
          <Breadcrumb cateName={ads.categoryName} cateId={ads.categoryId} subCateName={ads.subCategoryName} callFromListAds={this.nothing}/>
            <div className="wrapper-ads-details">
              <div className="row">
                <div className="col-md-8">
                  <div className="title">
                     {ads.title}
                    <div className="rating">
                      <i className="icon-star" />
                      <i className="icon-star" />
                      <i className="icon-star" />
                      <i className="icon-star" />
                      <i className="icon-star" />
                    </div>
                  </div>
                  <div className="wrapper-ads-content">
                    <div className="row">
                      <div className="col-md-9">
                      {ads.imagesLink && ads.imagesLink.length > 0 ? 
                        (<img className="md-img" src={ads.imagesLink[0]} alt="" />) : 
                        (<img className="md-img" src={require("../assets/images/no-image.png")}
                            alt=""/>
                        )}
                      </div>
                      <div className="col-md-3">
                      {ads.imagesLink && ads.imagesLink.length > 1 ? 
                        (<img className="sm-img" src={ads.imagesLink[1]} alt="" />) : 
                        ('')}
                        {ads.imagesLink && ads.imagesLink.length > 2 ? 
                        (<img className="sm-img" src={ads.imagesLink[2]} alt="" />) : 
                        ('')}
                        {ads.imagesLink && ads.imagesLink.length > 3 ? 
                        (<img className="sm-img" src={ads.imagesLink[3]} alt="" />) : 
                        ('')}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="section-content">
                          <div className="title-content">Mô tả:</div>
                          <span>{ads.content}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="wrapper-ads-bottom">
                    <div className="row">
                      <div className="wrapper-button">
                        <div className="button">
                          <button className="btn btn-outline-info">
                            Share
                          </button>
                          <button className="btn btn-outline-info">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pagination">
                      <div className="previous">
                        <i className="icon-caret-left" />
                        Previous Ads
                      </div>
                      <div className="hr" />
                      <div className="next">
                        Next Ads
                        <i className="icon-caret-right" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="section-info-ads">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="article-owner">
                          <div className="about">
                            <div className="title">Thông tin sản phẩm</div>
                            {ads.condition ? 
                              (<div>
                                <span className="italic">Tình trạng: </span>
                                <span className="bold">{ads.condition}</span>
                              </div>)
                            : ('')}
                            <div>
                              <span className="italic">Giá: </span>
                              <span className="bold">{ads.priceString}</span>
                            </div>
                            <div>
                              <span className="italic">Đăng lúc: </span>
                              <span className="bold">{ads.createdAtDate}</span>
                            </div>
                          </div>
                          <div className="seller-info">
                            <div className="title">Thông tin người bán</div>
                            <div className="row">
                              <div className="col-md-12">
                                <img src={profile.avatar} alt="" />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div>
                                  <span className="italic">Tên: </span>
                                  <span className="bold">{profile.accountName}</span>
                                </div>
                                <div>
                                  <span className="italic">Email: </span>
                                  <span className="bold">{profile.email}</span>
                                </div>
                                <div>
                                  <span className="italic">SĐT: </span>
                                  <span className="bold">{profile.phone}</span>
                                </div>
                                <Link className="btn btn-outline-info btn-view-profile"
                                  to={{ pathname: "/profile", search: `?id=${profile.accountId}` }}>Xem Hồ Sơ</Link>
                                <button className="btn btn-outline-info btn-mess">
                                  Nhắn tin
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  private getAdsDetails(id: number) {
    const BASE_URL = `http://localhost:5000/getAds?id=${id}`;
    fetch(`${BASE_URL}`, { method: 'GET' })
      .then(response => response.json())
      .then(res => {
        // console.log(res);
        const infoAds = res;
        const createdAt = new Date(infoAds.createdAt);
        const date = createdAt.getDate();
        const month = createdAt.getMonth();
        const year = createdAt.getFullYear();
        const hour = createdAt.getHours();
        const minute = createdAt.getMinutes();
        const second = createdAt.getSeconds();
        infoAds.createdAtDate = `${hour}:${minute}:${second} ${date}-${month}-${year}`;
        this.cateId = infoAds.categoryId;
        this.cateName = infoAds.categoryName;
        this.subCateName =infoAds.subCategoryName;
        // this.ads = infoAds;
        // console.log(this.ads);
        this.setState({
          ads: infoAds
        });
        console.log(this.state.ads);
        this.getProfile(res.accountId);
      })
      .catch(error => console.error('Error:', error));
    }

    private getProfile(id: number) {
      const BASE_URL = `http://localhost:5000/getProfile?id=${id}`;
      fetch(`${BASE_URL}`, { method: 'GET' })
        .then(response => response.json())
        .then(res => {
          // console.log(res);

          const infoProfile = res;
          infoProfile.avatar = infoProfile.avatar !== null ? infoProfile.avatar : this.noAvatar;
          this.setState({
            profile: infoProfile
          });
          console.log(this.state.profile);
        })
        .catch(error => console.error('Error:', error));
    }
}

export default AdsDetails;
