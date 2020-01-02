import * as React from "react";
import { RegionDTO } from 'src/models/region.model';

import { Link } from "react-router-dom";

import { History, Location } from 'history';

class Header extends React.Component<any, any> {

  // public readonly props: {
  //   // dataSearch: (data: any)=> void,
  //   location: Location,
  //   history: History
  // }
  public readonly state = {
    areaId: 0,
    keyWord: '',
    listArea: [],
    listRegion: RegionDTO[0],
    loadingArea: true,
    query: '',
    regionId: 0,
    showing: false,
  };
  constructor(props: any) {
    super(props);

    const urlCate = "http://localhost:5000/region/getAll";
    fetch(`${urlCate}`, { method: "GET" })
      .then(response => response.json())
      .then(res => {
        this.setState({
          listRegion: res.region
        });
      })
      .catch(error => console.error("Error:", error));

    this.changeShowing = this.changeShowing.bind(this);
    this.changeRegion = this.changeRegion.bind(this);
    this.changeArea = this.changeArea.bind(this);
    this.searchAds = this.searchAds.bind(this);
    this.changeKeyWord = this.changeKeyWord.bind(this);
  }

  public changeShowing() {
    this.setState({
      showing: !this.state.showing
    });
  }

  public changeRegion(e: any) {
    const value = e.target.value;
    if (value !== '0') {
      this.state.listRegion.forEach((item: RegionDTO) => {
        if (item.regionId === value) {
          this.setState({
            areaId: 0,
            listArea: item.area,
            loadingArea: false,
            query: `key=${this.state.keyWord}&regionId=${value}`,
            regionId: item.regionId
          });
        }
      });
    } else if (value === '0') {
      this.setState({
        areaId: 0,
        areaList: [],
        loadingArea: true,
        query: `key=${this.state.keyWord}`,
        regionId:  0
      });     
    }
  }

  public changeArea(e: any) {
    const value = e.target.value;
    if (value !== '0') {
      this.setState({
        areaId: value,
        query: `key=${this.state.keyWord}&regionId=${this.state.regionId}&areaId=${value}`
      });
    } else if (value === '0') {
      this.setState({
        areaId: 0,
        query: `key=${this.state.keyWord}&regionId=${this.state.regionId}`
      });     
    }
  }

  public searchAds() {

    const key = this.state.keyWord;
    const regionId = this.state.regionId;
    const areaId = this.state.areaId;
    const data = {key, regionId, areaId};
    // console.log(this.props.searchData);
    this.props.dataSearch(data);

    // if (key && regionId !== 0 && areaId !==0) {
    //   this.props.history.push(`list-ads?key=${this.state.keyWord}&regionId=${this.state.regionId}&areaId=${this.state.areaId}`);
    // } else if (key && regionId !== 0 && areaId ===0) {
    //   this.props.history.push(`list-ads?key=${this.state.keyWord}&regionId=${this.state.regionId}`);
    // } else if (key && regionId === 0 && areaId ===0) {
    //   this.props.history.push(`list-ads?key=${this.state.keyWord}`);
    // }
    
    
  }

  public changeKeyWord(e: any) {
    let q = '';
    if (this.state.areaId && this.state.areaId !== 0) {
      q = `key=${this.state.keyWord}&regionId=${this.state.regionId}&areaId=${this.state.areaId}`
    } else if (this.state.regionId && this.state.regionId !== 0) {
      q = `key=${this.state.keyWord}&regionId=${this.state.regionId}`
    } else {
      q = `key=${e.target.value}`
    }
    this.setState({
      keyWord: e.target.value,
      query: q
    });
  }

  public render() {
    const listRegion = this.state.listRegion;
    const listArea = this.state.listArea;

    return (
      <section className="header">
        <nav className="navbar navbar-expand-md navbar-light">
          <Link className="navbar-brand" to={`/`}>
            PADS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav mr-auto" />
            <form className="form-inline my-2 my-md-0 on-top-right">
              <span className="dropdown-search">
                <i
                  className={"icon-search" + (this.state.showing ? ' active' : '')}
                  data-toggle="collapse"
                  data-target=".collapseSearch"
                  aria-expanded="false"
                  aria-controls="arrow-down s-search"
                  onClick={this.changeShowing}
                />
                {this.state.showing ? (
                  <i
                    className="icon-chevron-thin-up arrow collapseSearch"
                    id="arrow-down"
                  />
                ) : (
                  ""
                )}
              </span>
              <button className="btn btn-border">
                <span>
                  <i className="icon-plus" />
                </span>
                Đăng bài
              </button>
              <button className="btn btn-border no-pl">Đăng nhập</button>
              <button className="btn btn-border no-pl btn-region">
                <i className="icon-star ico-left" />
                <span className="region-Name">VietNam</span>
                <i className="icon-caret-down ico-right" />
              </button>
            </form>
          </div>
        </nav>
        {this.state.showing ? (
          // <div className="section-search collapse collapseSearch" id="s-search">
          <div className="section-search collapseSearch" id="s-search">
            <div className="container">
              <div className="row">
                <div className="col-md-10 col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="I'm looking for ..."
                    value={this.state.keyWord}
                    onChange={this.changeKeyWord}
                  />
                </div>
                <div className="col-md-2 col-sm-4">
                  <Link
                    className="btn btn-info btn-search text-center"
                    to={{
                      pathname: "/list-ads",
                      search: `?${this.state.query}`
                    }}
                    onClick={this.searchAds}
                  >
                    Tìm kiếm
                  </Link>
                  {/* <button className="btn btn-info btn-search text-center" type="button" onClick={this.searchAds}>
                    Tìm kiếm
                  </button> */}
                </div>
              </div>
              <div className="row mg-top-15">
                <div className="col-md-5 col-sm-6">
                  <select
                    className="form-control"
                    onChange={this.changeRegion}
                    value={this.state.regionId}
                  >
                    <option value={0}>Chọn Tỉnh, Thành Phố</option>
                    {listRegion &&
                      listRegion.length > 0 &&
                      listRegion.map((item: RegionDTO, index: number) => {
                        return (
                          <option key={index} value={item.regionId}>
                            {item.regionName}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-md-5 col-sm-6">
                  <select className="form-control" 
                          disabled={this.state.loadingArea}
                          onChange={this.changeArea}
                          value={this.state.areaId}>
                    <option value={0}>Chọn Quận, Huyện, Thị Xã</option>
                    {listArea &&
                      listArea.length > 0 &&
                      listArea.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.areaId}>
                            {item.areaName}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </section>
    );
  }
}

export default Header;
