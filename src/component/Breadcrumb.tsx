import * as React from "react";
import { Link } from "react-router-dom";

// const Breadcrumb: React.StatelessComponent<IProps> = (props) => {
// export interface IProps {
//     cateName?: string | React.ReactChildren,
//     cateId?: number,
//     subCateName?: string
// }
// class Breadcrumb extends React.Component<IProps, {}> {
class Breadcrumb extends React.Component<any, any> {
  // public readonly props: {children: { cateName: string}};
  constructor(props: any) {
    super(props);
  }

  public emit(id: number) {
    const data = {id, type: `cate` }
    this.props.callFromListAds(data);
  }

  public render() {
    return (
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link
              to={{
                pathname: "/"
              }}
            >
              Trang chủ
            </Link>
          </li>
          <li className={"breadcrumb-item" + (!this.props.subCateName ? ' active' : '')}>
            {this.props.subCateName ? 
              ( 
                  <Link
                    to={{
                      pathname: "/list-ads",
                      search: `?cateId=${this.props.cateId}`
                    }}
                    onClick={this.emit.bind(this, this.props.cateId)}
                  >
                    {this.props.cateName}
                  </Link>
              )
            : (<span>{this.props.cateName}</span>)}
          </li>
          {this.props.subCateName ? (
            <li className="breadcrumb-item active">{this.props.subCateName}</li>
          ) : (
            ""
          )}
        </ol>
      </nav>
    );
  }
}

export default Breadcrumb;
