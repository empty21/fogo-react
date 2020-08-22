import React from "react";
import Skeleton from "react-loading-skeleton";
import LazyLoad from "react-lazyload";
import { connect } from "react-redux";
import api from "../../../../services/api";
import pushNotify from "../../../../utils/pushNotify";
import SearchRoomItem from "./components/SearchRoomItem";
import SharedRoomItem from "./components/SharedRoomItem";
import { mapStateToProps, mapDispatchToProps } from "../../../../redux/store";
import ReactPaginate from "react-paginate";


class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedRooms: {
        data: [],
        page: 0,
        summary: null
      },
      sharedRooms: {
        data: []
      }
    };
  }
  async componentDidMount() {
    document.title = "Fogo - Ứng dụng tìm phòng trọ miễn phí";
    this.props.setLoading();
    Promise.all([
      api.post("/rooms/search", {page: this.state.searchedRooms.page+1}),
      api.post("/rooms/search", {type: "Shared", limit: 5})
    ]).then(data => {
      this.setState(state => {
        state.searchedRooms.data = data[0].data;
        state.searchedRooms.summary = data[0].summary;
        state.sharedRooms.data = data[1].data;
        return state;
      });
      this.props.clearUi();
    }).catch(() => {
      pushNotify({ title: "Lỗi", message: "Lấy data thất bại", type: "danger"});
      this.props.clearUi();
    });
    this.props.clearUi();
    /*TODO*/
  }
  handlePageChange = (e) => {
    this.props.setLoading();
    api.post("/rooms/search", {page: e.selected+1})
      .then(data => {
        this.setState(state => {
          state.searchedRooms.data = data.data;
          return state;
        });
        this.props.clearUi();
      }).catch(() => {
        pushNotify({title: "Lỗi", message: "Lấy data thất bại", type: "danger"});
        this.props.clearUi();
      });

  }
  render() {
    const { searchedRooms, sharedRooms } = this.state;
    const { ui } = this.props;
    return (
      <div className="container-fluid">
        <div className="row pt-5">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header" >
                <span><i className="fas fa-home text-fogo mr-1"/>Phòng cho thuê</span>
              </div>
              <div className="card-body">
                {ui.loading ?
                  <Skeleton count={3}/> :
                  searchedRooms.data.map(room =>
                    <LazyLoad key={room.id} height={150}>
                      <SearchRoomItem  data={room}/>
                      <div className="border-top my-3"/>
                    </LazyLoad>
                  )
                }
              </div>
              <div className="card-footer">
                {ui.loading ?
                  <Skeleton circle={true}/> :
                  <ReactPaginate
                    previousLabel={'«'}
                    nextLabel={'»'}
                    breakLabel={''}
                    breakClassName={'page-item'}
                    breakLinkClassName={"page-link"}
                    pageCount={Math.ceil(searchedRooms.summary/10)}
                    forcePage={searchedRooms.page}
                    initialPage={searchedRooms.page}
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
          <div className="col-md-4 pt-5 pt-md-0">
            <div className="card">
              <div className="card-header">
                <span><i className="fas fa-user-friends text-fogo mr-1"/> Tìm bạn ở ghép</span>
              </div>
              <div className="card-body">
                {ui.loading ?
                  <Skeleton count={3}/> :
                  sharedRooms.data.map(room =>
                    <LazyLoad key={room.id} height={150}>
                      <SharedRoomItem data={room}/>
                      <div className="border-top my-3"/>
                    </LazyLoad>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
