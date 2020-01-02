import * as React from "react";
import Breadcrumb from "../component/Breadcrumb";
import Navigation from "../component/Navigation";

import { AdsDTO } from "src/models/ads.model";

import * as queryString from "query-string";
import { Link } from "react-router-dom";

import { History, Location } from 'history';


class ListAds extends React.Component<any, any> {
//   public readonly props: { 
//     // location: { search: string, state: number },
//     location: Location,
//     history : History,
//     dataSearch: boolean
//  };

  public readonly state = {
    areaId: 0,
    cateId: 0,
    cateName: "",
    changeView: true,
    countItems: 0,
    // dataFromNavigation: {id: 0, type: ''},
    keyWord: '',
    listAds: AdsDTO[0],
    regionId: 0,
    subCateId: 0,
    subCateName: "",
    // unListen: ''
  };

  constructor(props: any) {
    super(props);
    this.onInit();

    // this.changedView = this.changedView.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
  }

  public onInit() {
    const query = queryString.parse(this.props.location.search);
    console.log('init', this.props);
    if (query.cateId) {
      this.state.cateId = parseInt(String(query.cateId), 10);
      this.state.subCateId = 0;
    } else if (query.subCateId) {
      this.state.subCateId = parseInt(String(query.subCateId), 10);
    } else if (query.key) {
      this.state.cateId = 0;
      this.state.subCateId = 0;
      this.state.areaId = parseInt(String(query.areaId), 10);
      this.state.keyWord = String(query.key);
      this.state.regionId = parseInt(String(query.regionId), 10);
      // console.log(this.state);
      // this.searchAds();
    }
  }

  public componentDidMount() {
    console.log(`didMount`);
    if (this.state.cateId !== 0) {
      this.getAdsByCateId(this.state.cateId);
    } else if (this.state.subCateId !== 0) {
      this.getAdsBySubCateId(this.state.subCateId);
    } else if (this.state.keyWord !== '') {
      this.searchAds(this.state.keyWord, this.state.regionId, this.state.areaId);
    }
    
  }

  public changedView(type: string) {
    if (type === `grid`) {
      this.state.changeView = false;
    } else if (type === `list`) {
      this.state.changeView = true;
    }
    this.setState({
      changeView: this.state.changeView
    });
  }

  public reloadPage(dataFromChild?: any) {
    const e = dataFromChild;
    if (this.props.data && this.props.data.key) {
      this.props.data.key = null;
     }
    if (e.type === `cate`) {
      this.getAdsByCateId(e.id);
    } else if (e.type === `subCate`) {
      this.getAdsBySubCateId(e.id);
    }
  }

  // public shouldComponentUpdate(prevProps: any, prevState: any) {
  //   // return null
  // }

  public componentWillReceiveProps(nextP: any) { 
    // console.log(nextP);
    // console.log(this.props.data);
    if (nextP.data.key !== this.props.data.key || nextP.data.regionId !== this.props.data.regionId || nextP.data.areaId !== this.props.data.areaId) {
      const key = nextP.data.key;
      const regionId = nextP.data.regionId && nextP.data.regionId !== 0 ? nextP.data.regionId : null;
      const areaId = nextP.data.areaId && nextP.data.areaId !== 0 ? nextP.data.areaId : null;


    const BASE_URL = `http://localhost:5000/searchAds?key=${key}&regionId=${regionId}&areaId=${areaId}`;
    fetch(`${BASE_URL}`, { method: 'GET' })
      .then(response => response.json())
      .then(res => {
        const rs = res.response && res.response.docs ? res.response.docs : [];
        rs.forEach((item: AdsDTO) => {
          Object.keys(item).forEach((k: string, ind: number) => {
            if (k !== `imagesLink`) {
              item[k] = item[k][0];
            }
          });
        });
        this.setState({
          cateName: 'Hiển thị kết quả tìm kiếm',
          countItems: res.response && res.response.numFound ? res.response.numFound : 0,
          listAds: rs,
          subCateName: ''
        });
      })
      .catch(error => console.error('Error:', error));

    }
  }



  public render() {
    const listAds = this.state.listAds;

    return (
      <div>
        <Navigation callFromListAds={this.reloadPage} />
        <section className="content">
          <div className="container">
            <Breadcrumb
              cateName={this.state.cateName}
              cateId={this.state.cateId}
              subCateName={this.state.subCateName}
              callFromListAds={this.reloadPage}
            />
            <div className="wrapper-list-ads">
              <div className="filter">
                <div className="container">
                  <div className="col-md-12">
                    <div className="row">
                    {this.props.data && this.props.data.key ? 
                      ( <div className="filter-title">
                      <strong>{this.state.countItems}</strong> kết quả tìm kiếm cho "<strong>{this.props.data.key}</strong>"
                    </div>) : ('')}
                     
                      <div className="sort-by">
                        <select name="" id="" className="custom-select">
                          <option value="1">Sắp xếp</option>
                          <option value="2">Ngày đăng</option>
                          <option value="3">Giá tăng dần</option>
                          <option value="4">Giá giảm dần</option>
                        </select>
                      </div>
                      <div className="view">
                      <i className={"icon-grid icon-view" + (!this.state.changeView ? ' active' : '')} onClick={this.changedView.bind(this, 'grid')}/>
                      <i className={"icon-list icon-view" + (this.state.changeView ? ' active' : '')} onClick={this.changedView.bind(this, 'list')}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="list-ads">
                {this.state.changeView ? (
                  <div className="wrapper-list-details">
                    {listAds &&
                      listAds.length > 0 &&
                      listAds.map((item: AdsDTO, index: number) => {
                        return (
                          <div className="list-details" key={index}>
                            {item.imagesLink && item.imagesLink.length > 0 ? (
                              <img src={item.imagesLink[0]} alt="" />
                            ) : (
                              <img
                                src={require("../assets/images/no-image.png")}
                                alt=""
                              />
                            )}
                            <div className="details">
                              <div className="title">{item.title}</div>
                              <div className="rating">
                                <i className="icon-star" />
                                <i className="icon-star" />
                                <i className="icon-star" />
                                <i className="icon-star" />
                                <i className="icon-star" />
                              </div>
                              <div className="price">{item.priceString}</div>
                              <div className="phone">
                                <span>Liên hệ ngay với SĐT: </span>
                                <span className="phone-number">
                                  {item.phone}
                                </span>
                              </div>
                            </div>
                            <Link
                              className="btn btn-outline-info btn-view-details"
                              to={{
                                pathname: "/ads-details",
                                search: `?id=${item.adId}`
                              }}
                            >
                              Xem Chi Tiết
                            </Link>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="wrapper-list-article">
                    {listAds &&
                      listAds.length > 0 &&
                      listAds.map((item: AdsDTO, index: number) => {
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
                              <div className="type">{item.categoryName}</div>
                              <div className="sub-type">
                                {item.subCategoryName}
                              </div>
                              <div className="money">{item.priceString}</div>
                              <div className="phone">
                                <span>SĐT: </span>
                                <span className="phone-number">
                                  {item.phone}
                                </span>
                              </div>
                              <Link
                                className="btn btn-outline-info btn-sm btn-details"
                                to={{
                                  pathname: "/ads-details",
                                  search: `?id=${item.adId}`
                                }}
                              >
                                Chi Tiết
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}

                <nav aria-label="...">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a className="page-link" href="#">
                        Previous
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        2 <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
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
            </div>
          </div>
        </section>
      </div>
    );
  }

  private getAdsByCateId(id: number) {
    const BASE_URL = `http://localhost:5000/getAdsByCategory?cateId=${id}`;
    fetch(`${BASE_URL}`, { method: "GET" })
      .then(response => response.json())
      .then(res => {
        // console.log(res);
        // this.cateName = res[0].categoryName;
        // this.cateId = res[0].categoryId;
        this.setState({
          cateId: res[0].categoryId,
          cateName: res[0].categoryName,
          keyWord: '',
          listAds: res,
          subCateName: ""
        });
      })
      .catch(error => console.error("Error:", error));
  }

  private getAdsBySubCateId(id: number) {
    const BASE_URL = `http://localhost:5000/getAdsBySubCategory?subCateId=${id}`;
    fetch(`${BASE_URL}`, { method: "GET" })
      .then(response => response.json())
      .then(res => {
        // console.log(res);
        // this.cateName = res[0].categoryName;
        // this.cateId = res[0].categoryId;
        // this.subCateName = res[0].subCategoryName;
        this.setState({
          cateId: res[0].categoryId,
          cateName: res[0].categoryName,
          keyWord: '',
          listAds: res,
          subCateName: res[0].subCategoryName
        });
        
      })
      .catch(error => console.error("Error:", error));
  }
  
  private searchAds(keyR: any, regionIdR: any, areaIdR: any) {
    const key = keyR;
    const regionId = regionIdR && regionIdR !== 0 ? regionIdR : null;
    const areaId = areaIdR && areaIdR !== 0 ? areaIdR: null;

    if (this.props.data) {
      this.props.data.key = keyR;
    }

    const BASE_URL = `http://localhost:5000/searchAds?key=${key}&regionId=${regionId}&areaId=${areaId}`;
    fetch(`${BASE_URL}`, { method: 'GET' })
      .then(response => response.json())
      .then(res => {
        const rs = res.response && res.response.docs ? res.response.docs : [];
        rs.forEach((item: AdsDTO) => {
          Object.keys(item).forEach((k: string, ind: number) => {
            if (k !== `imagesLink`) {
              item[k] = item[k][0];
            }
          });
        });
        this.setState({
          cateName: 'Hiển thị kết quả tìm kiếm',
          countItems: res.response && res.response.numFound ? res.response.numFound : 0,
          listAds: rs,
          subCateName: ''
        });
      })
      .catch(error => console.error('Error:', error));
  }
}

export default ListAds;
