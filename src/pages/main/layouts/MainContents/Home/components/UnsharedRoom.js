import React, {useEffect, useState} from "react";
import {MDBIcon, MDBRow, MDBCol} from "mdbreact";
import RoomItem from "./RoomItem";
import ReactPaginate from "react-paginate";
import {getSearchResult} from "../../../../../../services/api";

function UnsharedRoom() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [data, setData] = useState(Array(6).fill(null));
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    setLoading(true);
    getSearchResult({page: page+1, limit: 6})
      .then(data => {
        if(data?.data) {
          setData(data.data);
          setSummary(data.summary);
        }
        setLoading(false);
      })
  },[page]);
  return (
    <section id="unshared-room" className="text-center py-4">
      <h2 className='text-primary font-weight-bold text-center'><MDBIcon icon="home"/> Phòng cho thuê</h2>
      <MDBRow className="my-4">
        {
          data.map((room, i) =>
              <MDBCol key={"unshared-"+i} sm="6" lg="4 mb-3" className="d-flex">
                <RoomItem data={room} isLoading={loading} />
              </MDBCol>
          )
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
    </section>
  );
}

export default UnsharedRoom;