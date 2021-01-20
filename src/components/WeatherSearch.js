import React, { Component } from 'react';
import { Form, Card, Badge } from 'react-bootstrap';

export default class WeatherSearch extends Component {
    constructor() {
        super();
        this.state = {
            searchData: [],
            noData: null
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(function (position) {
        });
    }

    // search function
    search(key) {
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + key + '&appid=212ba6f4ef8b933b4a957f59b8522352&units=metric').then((response) => {
            response.json().then((data) => {
                if (data.length > 0) {
                    this.setState({ searchData: [data] });
                } else {
                    this.setState({ noData: true, searchData: null });
                }
                this.setState({ searchData: [data] });
            })
        })
    }

    render() {
        return (
            <div className="container">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter city" onChange={(e) => this.search(e.target.value)} />
                    </Form.Group>
                </Form>

                <div>
                    {
                        // display search result
                        this.state.searchData ?
                            <div>
                                {
                                    this.state.searchData.map((item) => {
                                        return (
                                            <div className="card">
                                                <div className="card-header">
                                                    <div className="d-flex">

                                                        <a href="#">{item.name}</a>
                                                        <div className="d-flexflex-column ml-auto p-2">
                                                            <p className="search-temperature">{item.main.temp}°C</p>
                                                            <p className="search-temperature">{item.weather[0].description}</p>
                                                        </div>
                                                        <img src={'http://openweathermap.org/img/wn/' + item.weather[0].icon + '@2x.png'} />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            :
                            null
                    }
                    {
                        this.state.noData ? <Card>
                            <Card.Header>
                                No data found
                        </Card.Header>
                        </Card> : null
                    }


                    {
                        // display daily climate
                        this.state.searchData ?
                            <div>
                                {
                                    this.state.searchData.map((item) => {
                                        return (<div className="my-3">
                                            <Card style={{ width: '9rem' }} className="text-center">
                                                <Card.Body>
                                                    <Card.Title>{item.main.temp}°C</Card.Title>
                                                    <img src={'http://openweathermap.org/img/wn/' + item.weather[0].icon + '@2x.png'} />
                                                    <Card.Text>
                                                        {item.weather[0].description}
                                                    </Card.Text>

                                                </Card.Body>
                                            </Card>
                                        </div>
                                        )
                                    })
                                }
                            </div>
                            :
                            null
                    }


                    {
                        // display temperature
                        this.state.searchData ?
                            <div>
                                {
                                    this.state.searchData.map((item) => {
                                        return (
                                            <Card style={{ width: 'auto' }}>
                                                <Card.Body>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Card.Title><h2>{item.main.temp}°C</h2></Card.Title>
                                                        <img src={'http://openweathermap.org/img/wn/' + item.weather[0].icon + '@2x.png'} />
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Badge className="py-2 px-4 m-1" variant="primary">
                                                            <label>Pressure</label>
                                                            <Card.Text>
                                                                {item.main.pressure} hpa
                                                        </Card.Text></Badge>
                                                        <Badge className="py-2 px-4" variant="primary">
                                                            <label>Humidity</label>
                                                            <Card.Text>
                                                                {item.main.humidity} %
                                                        </Card.Text></Badge>
                                                    </div>

                                                </Card.Body>
                                            </Card>


                                        )
                                    })
                                }
                            </div>
                            :
                            null
                    }
                </div>
            </div >
        )
    }
}
