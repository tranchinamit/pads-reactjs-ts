import * as React from "react";

import Navigation from "../component/Navigation";

import { AdsDTO } from "src/models/ads.model";
import { ProfileDTO } from "src/models/profile.model";

import * as queryString from "query-string";
import { Link } from 'react-router-dom';

// import { Link } from "react-router-dom";

class Profile extends React.Component {
  public readonly props: { location: { search: string } };
  public readonly state = {
    listPost: AdsDTO[0],
    profile: new ProfileDTO()
  };
  public countPost: number = 0;
  public readonly noAvatar = `https://static.chotot.com.vn/imaginary/f3828794a0c27a238ad00e80153801d6790e57d0/profile_avatar/e8f2cfa6986a75b52ee81a75eee12469a0ad1532/thumbnail?width=160`;

  constructor(props: any) {
    super(props);

    const id = queryString.parse(this.props.location.search).id
      ? queryString.parse(this.props.location.search).id
      : null;

    this.getProfile(parseInt(String(id), 10));
    this.getListPost(parseInt(String(id), 10));
    this.nothing = this.nothing.bind(this);
  }

  public nothing(dataFromChild?: any) {
    console.log(`nothing`);
  }

  public render() {
    const profile = this.state.profile;
    const listPost = this.state.listPost;
    return (
      <div>
        <Navigation callFromListAds={this.nothing}/>
        <section className="content">
          <div className="page-title text-center">
            <h1>Thông tin thành viên</h1>
          </div>
          <div className="container">
            <div className="img-background">
              <div className="info-user">
                <div className="row">
                  <div className="col-md-9 left">
                    <div className="row">
                      <div className="col-md-4 wrapper-avatar">
                        <img
                          src={profile.avatar}
                          alt="avatar"
                          className="avatar"
                        />
                      </div>
                      <div className="col-md-8 wrapper-info">
                        <div className="info">
                          <h4>{profile.accountName}</h4>
                          <div className="info-row">
                            Email:{" "}
                            <span className="info-text">{profile.email}</span>
                          </div>
                          <div className="info-row">
                            SĐT:{" "}
                            <span className="info-text">{profile.phone}</span>
                          </div>
                          <div className="info-row">
                            Địa Chỉ:{" "}
                            <span className="info-text">{profile.address}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 right">
                    <div className="row">
                      <div className="col-md-12">
                        <p />
                        <p>
                          <strong>{this.countPost}</strong> bài đã được đăng
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sold-items">
              <h3>Danh sách các bài đăng</h3>
              <div className="article-items">
                <i className="icon-chevron-left" />
                {listPost &&
                  listPost.length > 0 &&
                  listPost.map((item: AdsDTO, index: number) => {
                    return (
                      <div className="list-article" key={index}>
                        <Link
                          to={{
                            pathname: "/ads-details",
                            search: `?id=${item.adId}`
                          }}
                        >
                          {item.imagesLink ? (
                            <img src={item.imagesLink[0]} alt="" />
                          ) : (
                            <img
                              src={require("../assets/images/no-image.png")}
                              alt=""
                            />
                          )}
                        </Link>
                        <div className="ads-description">
                          <div className="title">
                            <Link
                              to={{
                                pathname: "/ads-details",
                                search: `?id=${item.adId}`
                              }}
                            >
                              {item.title}
                            </Link>
                          </div>
                          <div className="sub-type">{item.categoryName}</div>
                          <div className="createdAt">Đăng ngày: {item.createdAtDate}</div>
                          <div className="money">{item.priceString}</div>
                        </div>
                      </div>
                    );
                  })}

                <i className="icon-chevron-right" />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  public getProfile(id: number) {
    const BASE_URL = `http://localhost:5000/getProfile?id=${id}`;
    fetch(`${BASE_URL}`, { method: "GET" })
      .then(response => response.json())
      .then(res => {
        // console.log(res);
        const infoProfile = res;
        infoProfile.avatar =
          infoProfile.avatar !== null ? infoProfile.avatar : this.noAvatar;
        this.setState({
          profile: res
        });
      })
      .catch(error => console.error("Error:", error));
  }

  public getListPost(id: number) {
    const BASE_URL = `http://localhost:5000/getListPost?id=${id}`;
    fetch(`${BASE_URL}`, { method: "GET" })
      .then(response => response.json())
      .then(res => {
        // console.log(res);
        this.countPost = res.length;
        res.forEach((item: AdsDTO, index: number) => {
          const createdAt = new Date(item.createdAt);
          const date = createdAt.getDate();
          const month = createdAt.getMonth();
          const year = createdAt.getFullYear();
          res[index].createdAtDate = `${date}-${month}-${year}`;
        });
        this.setState({
          listPost: res
        });
        console.log(this.state.listPost);
      })
      .catch(error => console.error("Error:", error));
  }
}

export default Profile;
