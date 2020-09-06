import React, {useEffect, useState} from "react";
import SearchedRoomComponent from "../HomeComponent/components/SearchedRoomComponent";
import InputRange from "react-input-range";
import "react-input-range/src/scss/index.scss"
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

function SearchComponent(props) {
  const { register, handleSubmit } = useForm();
  const [price, setPrice] = useState({min: 0, max: 10});
  const [query, setQuery] = useState({text: props.match.params.searchText.split("-").join(" ")});
  useEffect(() => {
    document.title = "Fogo - Tìm kiếm: " + query.text
  }, [query]);
  const handleSearch = (data) => {
    if(data.text !== query.text) props.history.push("/search/"+data.text.split(" ").join("-"));
    setQuery({
      text: data.text,
      gender: data.gender,
      price,
      type: Object.keys(data.type).filter(key => data.type[key])
    });
  }
  return (
    <React.Fragment>
      <Container fluid={true} className="mt-5 pt-5">
        <Row>
          <Col md={8}>
            <SearchedRoomComponent query={query} tabName="Kết quả tìm kiếm" />
          </Col>
          <Col md={4}>
            <Card>
              <Card.Header>
                <span><i className="fas fa-filter text-fogo mr-1"/>Bộ lọc tìm kiếm</span>
              </Card.Header>
              <Card.Body className="text-icon">
                <Form onSubmit={handleSubmit(handleSearch)}>
                  <Form.Group>
                    <Form.Label>Từ khoá:</Form.Label>
                    <Form.Control className="rounded-pill"
                                  name="text"
                                  defaultValue={query.text}
                                  ref={register}
                    />
                  </Form.Group>
                  <div className="border-top my-3"/>
                  <Form.Group>
                    <Form.Label className="mb-4">Khoảng giá (triệu): </Form.Label>
                    <InputRange
                      minValue={0} maxValue={10}
                      value={price} step={0.1}
                      onChange={setPrice}
                      formatLabel={value => value.toFixed(1)}
                    />
                  </Form.Group>
                  <div className="border-top my-3 mt-4"/>
                  <Form.Group>
                    <Form.Label>Loại phòng: </Form.Label>
                    <Form.Check name="type.Unshared" label="Phòng cho thuê"
                                ref={register}
                                defaultChecked={true}/>
                    <Form.Check name="type.Shared" label="Phòng ở ghép"
                                ref={register}
                                defaultChecked={true}/>
                    <Form.Check name="type.Apartment" label="Căn hộ"
                                ref={register}
                                defaultChecked={true}/>
                    <Form.Check name="type.Dormitory" label="Kí túc xá/Home Stay"
                                ref={register}
                                defaultChecked={true}/>
                  </Form.Group>
                  <div className="border-top my-3"/>
                  <Form.Group>
                    <Form.Label>Giới tính: </Form.Label>
                    <Form.Control as="select" className="rounded-pill" name="gender" ref={register}>
                      <option value="any">Nam hoặc nữ</option>
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                    </Form.Control>
                  </Form.Group>
                  <div className="border-top my-3"/>
                  <Form.Group className="clearfix mb-0">
                    <Button type="reset" className="rounded-pill btn-light btn-outline-warning float-right">
                      Clear
                    </Button>
                    <Button type="submit" className="rounded-pill btn-success float-left">
                      <i className="fa fa-search text-white"/>
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default SearchComponent