import React from "react";
import Skeleton from "react-loading-skeleton";
import LazyLoad from "react-lazyload";
import ReactPaginate from "react-paginate";
import SearchedRoomItem from "./SearchedRoomItem";
import api from "../../../../../services/api";
import pushNotify from "../../../../../utils/pushNotify";

class SearchedRoomComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: null,
      summary: null,
      page: 0
    }

  }
  componentDidMount() {
    this.setState({
      ...this.state,
      isLoading: true
    });
    api.post("/rooms/search", {page: this.state.page+1, ...this.props.query})
    .then(res => {
      console.log(res);
      this.setState({
        ...this.state,
        data: res.data,
        summary: res.summary
      })
    }).catch(()=> {
      pushNotify({ title: "Lỗi", message: "Lấy data thất bại", type: "danger"});
    }).finally(() => {
      this.setState({
        ...this.state,
        isLoading: false
      });
    });
  }

  handlePageChange = (e) => {
    this.setState({
      ...this.state,
      isLoading: true
    });
    api.post("/rooms/search", {page: e.selected+1, ...this.props.query})
    .then(data => {
      this.setState(state => {
        state.data = data.data;
        state.page = e.selected;
        return state;
      });
    }).catch(() => {
      pushNotify({title: "Lỗi", message: "Lấy data thất bại", type: "danger"});
    }).finally(() => {
      this.setState({
        ...this.state,
        isLoading: false
      });
    });

  }
  render() {
    const { isLoading, data, summary, page} = this.state;
    return (
      <div className="col-md-8">
        <div className="card">
          <div className="card-header" >
            <span><i className="fas fa-home text-fogo mr-1"/>Phòng cho thuê</span>
          </div>
          <div className={"card-body"+(data ? "": "pb-0")}>
            {isLoading ?
              <Skeleton count={3}/> :
             data ?
                data.map(room =>
                  <LazyLoad key={room.id} height={150}>
                    <SearchedRoomItem  data={room}/>
                    <div className="border-top my-3"/>
                  </LazyLoad>
                ) :
                <p className="text-center">Không tìm thấy kết quả nào</p>
            }
          </div>
          <div className="card-footer">
            {isLoading ?
              <Skeleton circle={true}/> :
              <ReactPaginate
                previousLabel={'«'}
                nextLabel={'»'}
                breakLabel={''}
                breakClassName={'page-item'}
                breakLinkClassName={"page-link"}
                pageCount={Math.ceil(summary/10)}
                forcePage={page}
                onPageChange={this.handlePageChange}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                containerClassName={'pagination justify-content-end'}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                activeClassName={'active'}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                disabledClassName={"disabled"}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}
export default SearchedRoomComponent;