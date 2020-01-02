import * as React from "react";

import { AdsDTO } from "src/models/ads.model";
import { CategoryDTO } from "src/models/category.model";

import { Link } from "react-router-dom";

class Home extends React.Component {
  public readonly state = {
    listAds: AdsDTO[0],
    listCate: CategoryDTO[0]
  };

  constructor(props: any) {
    super(props);

    const options = {
      limit: 12,
      skip: 0
    };

    const urlAds = `http://localhost:5000/getLatestPost?limit=${options.limit}&skip=${options.skip}`;
    fetch(`${urlAds}`, { method: "GET" })
      .then(response => response.json())
      .then(res => {
        // console.log(res);
        console.log(res);
        this.setState({
          listAds: res
        });
      })
      .catch(error => console.error("Error:", error));

    const urlCate = "http://localhost:5000/category/getAll";
    fetch(`${urlCate}`, { method: "GET" })
      .then(response => response.json())
      .then(res => {
        this.setState({
          listCate: res.category
        });
      })
      .catch(error => console.error("Error:", error));
  }

  public render() {
    const listAds = this.state.listAds;
    const listCate = this.state.listCate;

    return (
      <section className="content">
        <div className="container">
          <section className="categories">
            <div className="cate-title text-center">
              <h2>All Categories</h2>
            </div>
            <div className="article-cate">
              {listCate &&
                listCate.length > 0 &&
                listCate.map((item: CategoryDTO, index: number) => {
                  return (
                    <div className="box" key={index}>
                      <div className="m-icon">
                        {/* <Link to="/list-ads" params={{ 'cateId': item.categoryId }}> */}
                        <Link to={`/list-ads?cateId=${item.categoryId}`}>
                          {item.imageLink ? (
                            <img src={item.imageLink} alt="" />
                          ) : (
                            <img
                              src={require("../assets/images/no-image.png")}
                              alt=""
                            />
                          )}
                        </Link>
                      </div>
                      <div className="description-cate">
                        <Link
                          to={{
                            pathname: "/list-ads",
                            search: `?cateId=${item.categoryId}`
                          }}
                        >
                          {item.categoryName}
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
          <section className="top-posts">
            <div className="posts-title">
              <h4>Top Posts</h4>
            </div>
            <div className="article-post">
              {listAds &&
                listAds.length > 0 &&
                listAds.map((item: AdsDTO, index: number) => {
                  return (
                    <div className="box" key={index}>
                      <div className="post-image">
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
                      </div>
                      <div className="title-post">
                        <Link
                          to={{
                            pathname: "/ads-details",
                            search: `?id=${item.adId}`
                          }}
                        >
                          {item.title}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              <nav aria-label="navigation ">
                <ul className="pagination justify-content-end">
                  <li className="page-item disabled">
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>

                  <li className="page-item active">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>

                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </section>
        </div>
      </section>
    );
  }
}

export default Home;
