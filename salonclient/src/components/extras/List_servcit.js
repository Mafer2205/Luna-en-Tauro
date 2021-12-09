import { Component } from "react";
import { Redirect} from "react-router-dom";
import axios from "axios";


import { Container, Table, Alert } from "reactstrap";


class ListCitServ extends Component {

    constructor (props) {
        super (props);
        var token = localStorage.getItem("ACCESS_TOKEN");
        
        this.state = {
            items: [],
            isFetched: false,
            error: null,
            token: token
        }
    }

    componentDidMount () {
        axios.get ("http://localhost:5000/api/servicioscitas", {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            }
        })
        .then (
            (response) => {
                console.log("Response: " + response.status);
                if (response.status === 200) {
                    this.setState (
                        {
                            items: response.data,
                            isFetched: true,
                            error: null,
                        }
                    )
                }
            },
            (error) => {
                if (error.response.status === 401) {
                    localStorage.removeItem("ACCESS_TOKEN");
                    this.setState (
                        {
                            token: ''
                        }
                    )
                }
            }
        );
    }

    render () {

        if (!this.state.token) {
            return (
                <Redirect
                    to = 
                    {
                        {
                            pathname: '/login',
                            state: {
                                from: this.props.location
                            }
                        }
                    }
                />
            )
        }

        if (!this.state.isFetched) {
            return (
                <Container>
                    <Alert color="primary">Loading....</Alert>
                </Container>
            );
        }

        const items = this.state.items;

        const dateFormatter = (date) => {
            var formatter = new Intl.DateTimeFormat('en-mx', 'dd-MM-yyyy');
             return formatter.format(new Date (date));
         }

        return (
            
            <Container>
                
                <Table striped bordered hover>
                    <thead>
                        <tr align= "center">
                            <th>Fecha de cita</th>
                            <th>Servicio aplicado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map (item => 
                                <tr align= "center">
                                    <td>{dateFormatter(item.fecha)}</td>
                                    <td>{item.nomb_serv}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }

}

export default ListCitServ;