import React, {useEffect, useState} from "react";
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import SearchResult from "./components/SearchResult";

function SearchResultComponent(props) {
  const {search} = props.location;

  useEffect(()=>{
    window.$(function () {
      window.$(".sticky").sticky({
        minWidth: 991,
        topSpacing: 90,
        zIndex: 2,
        stopper: "#footer"
      });
    });
    window.$(document).ready(function() {
      window.$('.mdb-select').materialSelect();
    });
  },[]);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    const urlQuery = new URLSearchParams(search);
    setQuery({
      text: urlQuery.get("q") || "",
      type: urlQuery.get("t") || "",
      sortBy: urlQuery.get("s") === "price" ?
        "details.price.value" : urlQuery.get("s") === "area" ?
          "details.area" : "createdAt",
      orderBy: urlQuery.get("o") || "desc"
    })
  }, [search]);
  const handleFilter = (e) => {
    const newQuery = new URLSearchParams(search);
    const {target} = e;
    const [name, value] = target.id.split(".");
    if(target.type === "select-one") {
      newQuery.set(target.id, target.value);
      props.history.push("/search?"+newQuery.toString());
    } else {
      if(query[target.name] !== value) {
        newQuery.set(name, value);
        props.history.push("/search?"+newQuery.toString());
      }
    }
  }
  return (
    <section id="searchResult" className="mt-5 py-5">
      <MDBContainer >
        <MDBRow>
         <MDBCol id="search-filter-vertical" lg="3" className="order-lg-last">
          <MDBCard className={window.innerWidth >= 991 && "sticky"}>
            <MDBCardHeader>
              <MDBIcon icon="filter"/> Bộ lọc tìm kiếm
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow>
                <MDBCol size="12" sm="6" lg="12">
                  <h5 className="mb-2">Sắp xếp theo</h5>
                  <div className="dropdown-divider mb-3"/>
                  <ul className="list-unstyled link-black">
                    <li className="mb-2">
                      <div className="form-check pl-0 mb-2">
                        <input type="radio" className="form-check-input"
                               id="s.time"
                               checked={query?.sortBy === "createdAt"}
                               name="sortBy"
                               onChange={handleFilter}
                        />
                        <label className="form-check-label" htmlFor="s.time">Ngày đăng</label>
                      </div>
                    </li>
                    <li className="mb-2">
                      <div className="form-check pl-0 mb-2">
                        <input type="radio" className="form-check-input"
                               id="s.price"
                               checked={query?.sortBy === "details.price.value"}
                               name="sortBy"
                               onChange={handleFilter}
                        />
                        <label className="form-check-label" htmlFor="s.price">Giá</label>
                      </div>
                    </li>
                    <li className="mb-2">
                      <div className="form-check pl-0 mb-2">
                        <input type="radio" className="form-check-input"
                               id="s.area"
                               checked={query?.sortBy === "details.area"}
                               name="sortBy"
                               onChange={handleFilter}
                        />
                        <label className="form-check-label" htmlFor="s.area">Diện tích</label>
                      </div>
                    </li>
                    <li className="mb-2">
                      <select className="mdb-select md-form colorful-select dropdown-primary" id="o" name="orderBy"
                              value={query?.orderBy}
                              onChange={handleFilter}
                      >
                        <option value="desc">Giảm dần</option>
                        <option value="asc">Tăng dần</option>
                      </select>
                    </li>
                  </ul>
                  <div className="dropdown-divider mb-3 d-none d-lg-block"/>
                </MDBCol>
                <MDBCol size="12" sm="6" lg="12">
                  <h5 className="mb-2">Loại phòng</h5>
                  <div className="dropdown-divider mb-3"/>
                  <ul className="list-unstyled link-black">
                    <li className="mb-2">
                      <div className="form-check pl-0 mb-2">
                        <input type="radio" className="form-check-input"
                               id="t.any"
                               checked={query?.type === ""}
                               name="type"
                               onChange={handleFilter}
                        />
                        <label className="form-check-label" htmlFor="t.any">Tất cả</label>
                      </div>
                    </li>
                    <li className="mb-2">
                      <div className="form-check pl-0 mb-2">
                        <input type="radio" className="form-check-input"
                               id="t.Unshared"
                               checked={query?.type === "Unshared"}
                               name="type"
                               onChange={handleFilter}
                        />
                        <label className="form-check-label" htmlFor="t.Unshared">Phòng cho thuê</label>
                      </div>
                    </li>
                    <li className="mb-2">
                      <div className="form-check pl-0 mb-2">
                        <input type="radio" className="form-check-input"
                               id="t.Shared"
                               checked={query?.type === "Shared"}
                               name="type"
                               onChange={handleFilter}
                        />
                        <label className="form-check-label" htmlFor="t.Shared">Phòng ở ghép</label>
                      </div>
                    </li>
                    <li className="mb-2">
                      <div className="form-check pl-0 mb-2">
                        <input type="radio" className="form-check-input"
                               id="t.Apartment"
                               checked={query?.type === "Apartment"}
                               name="type"
                               onChange={handleFilter}
                        />
                        <label className="form-check-label" htmlFor="t.Apartment">Căn hộ</label>
                      </div>
                    </li>
                    <li className="mb-2">
                      <div className="form-check pl-0 mb-2">
                        <input type="radio" className="form-check-input"
                               id="t.Dormitory"
                               checked={query?.type === "Dormitory"}
                               name="type"
                               onChange={handleFilter}
                        />
                        <label className="form-check-label" htmlFor="t.Dormitory">Kí túc xá / Home stay</label>
                      </div>
                    </li>
                  </ul>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
          <MDBCol size="12" lg="9" className="order-lg-first mt-5 mt-lg-0">
            {query && <SearchResult query={query} />}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default SearchResultComponent;