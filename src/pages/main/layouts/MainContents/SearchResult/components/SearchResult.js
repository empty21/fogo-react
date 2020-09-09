import React, {useEffect, useState} from "react";
import { MDBCol, MDBRow} from "mdbreact";
import { connect } from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "../../../../../../redux/store";
import {getSearchResult} from "../../../../../../services/api";
import RoomItem from "../../Home/components/RoomItem";
import ReactPaginate from "react-paginate";
import {Helmet} from "react-helmet";

function SearchResult(props) {
  const {query, setLoading, clearUi} = props;
  const [page, setPage] = useState(0);
  const [data, setData] = useState(Array(6).fill(null));
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    setLoading();
    getSearchResult({page: page+1, limit: 6, ...query})
      .then(data => {
        console.log(data);
        if(data?.data) {
          setData(data.data);
          setSummary(data.summary);
        }
        clearUi();
      })
  }, [query, page, setLoading, clearUi])
  return (
    <React.Fragment>
      <MDBRow className="my-4">
        <Helmet>
          <title>{query.text} - Fogo Search</title>
        </Helmet>
        {data?.length > 0 ?
          data.map((room, i) =>
            <MDBCol key={"unshared-"+i} sm="6" lg="4 mb-3" className="d-flex">
              <RoomItem data={room} isLoading={props.loading} />
            </MDBCol>
          ) :
          <p>Không có phòng nào được tìm thấy</p>
        }
      </MDBRow>
      <ReactPaginate
        previousLabel={'«'}
        nextLabel={'»'}
        breakLabel={'...'}
        breakClassName={'page-item'}
        breakLinkClassName={"page-link"}
        pageCount={Math.ceil(summary/6)}
        forcePage={page}
        onPageChange={e => setPage(e.selected)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        containerClassName={'pagination justify-content-center'}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        activeClassName={'active'}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        disabledClassName={"disabled"}
      />
    </React.Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);