import React, {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import LazyLoad from "react-lazyload";
import ReactPaginate from "react-paginate";
import { Card } from "react-bootstrap";
import SearchedRoomItem from "./SearchedRoomItem";
import api from "../../../../../services/api";
import pushNotify from "../../../../../utils/pushNotify";

function SearchedRoomComponent(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getSearchResult({page: page+1, ...props.query})
  },[props.query, page]);
  const getSearchResult = (query) => {
    setLoading(true);
    api.post("/rooms/search", query)
    .then(data => {
      setData(data.data);
      setSummary(data.summary);
    }).catch(() => {
      pushNotify({title: "Lỗi", message: "Lấy data thất bại", type: "danger"});
    }).finally(() => {
      setLoading(false);
    });
  }

  const handlePageChange = (e) => {
    setPage(e.selected);
  }

  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <span><i className="fas fa-home text-fogo mr-1"/>{props.tabName}</span>
        </Card.Header>
        <Card.Body>
          {loading ?
            <Skeleton count={3}/> :
            data && data.length > 0 ?
              data.map(room =>
                <LazyLoad height={150} once>
                  <SearchedRoomItem  data={room}/>
                  <div className="border-top my-3"/>
                </LazyLoad>
              ) :
              <p className="text-center">Không tìm thấy kết quả nào</p>
          }
        </Card.Body>
        <Card.Footer>
          {loading ?
            <Skeleton circle={true}/> :
            <ReactPaginate
              previousLabel={'«'}
              nextLabel={'»'}
              breakLabel={''}
              breakClassName={'page-item'}
              breakLinkClassName={"page-link"}
              pageCount={Math.ceil(summary/10)}
              forcePage={page}
              onPageChange={handlePageChange}
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
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
}
export default SearchedRoomComponent;