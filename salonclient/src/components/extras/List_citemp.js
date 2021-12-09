import { Component } from "react";
import { Redirect} from "react-router-dom";
import axios from "axios";


import { Container, Table, Alert } from "reactstrap";


class ListCitEmp extends Component {

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
        axios.get ("http://localhost:5000/api/empleadoscitas", {
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
                            <th>Nombre empleado</th>
                            <th>Apellido empleado</th>
                            <th>Fecha de cita</th>
                            <th>Cobro total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map (item => 
                                <tr align= "center">
                                    <td>{item.nomb_emp}</td>
                                    <td>{item.app_emp}</td>
                                    <td>{dateFormatter(item.fecha)}</td>
                                    <td>{item.total_cita}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }

}

export default ListCitEmp;