import * as React from "react";

import { CategoryDTO, ISubCategory } from "src/models/category.model";

import { Link } from "react-router-dom";



class Navigation extends React.Component<any, any> {
  public readonly state = {
    cateId: 0,
    listCate: CategoryDTO[0],
    // props: {},
    subCateId: 0,
    
  };

  constructor(props: any) {
    super(props);

    // console.log(String(queryString.parse(this.props)));

    const urlCate = "http://localhost:5000/category/getAll";
    fetch(`${urlCate}`, { method: "GET" })
      .then(response => response.json())
      .then(res => {
        // console.log(res);
        this.setState({
          listCate: res.category
        });
      })
      .catch(error => console.error("Error:", error));

    // this.emit = this.emit.bind(this);
  }

  public emit(id: number, type: string) {
    const data = {id, type }
    this.props.callFromListAds(data);
  }

  public render() {
    const listCate = this.state.listCate;
    return (
      <div className="menu-navigation">
        <ul>
          {listCate && listCate.length > 0 && listCate.map((item: CategoryDTO, index: number) => {
            return (
              <li key={index}>
                <Link
                  className="main-cate"
                  to={{
                    pathname: "/list-ads",
                    search: `?cateId=${item.categoryId}`
                  }}
                  onClick={this.emit.bind(this, item.categoryId, `cate`)}
                >
                  {item.categoryName}
                </Link>
                <div className="sub-cate" >
                {item.subCategory && item.subCategory.length > 0 && 
                  item.subCategory.map((i: ISubCategory, ind: number) => {
                    return (
                      <Link key={ind}
                        className="sub-cate-item"
                        to={{
                          pathname: "/list-ads",
                          search: `?subCateId=${i.subCategoryId}`
                        }}
                        onClick={this.emit.bind(this, i.subCategoryId, `subCate`)}
                      >
                        {i.subCategoryName}
                      </Link>
                    )
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Navigation;
