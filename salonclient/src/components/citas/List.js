import { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";


import { Container, Table, Alert, Navbar, NavItem } from "reactstrap";


class ListCitas extends Component {

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
        axios.get ("http://localhost:5000/api/citas", {
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

                <Navbar expand="lg" className="navheader">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mx-auto">
                        <NavItem>
                            <Link to={'/AddCitas'} style={{color:"white"}} className="nav-link">Agregar Cita     |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListCitas'} style={{color:"white"}} className="nav-link">Ver Citas</Link>
                        </NavItem>
                        </ul>
                    </div>
                </Navbar>
                
                <Table striped bordered hover>
                    <thead>
                        <tr align= "center">
                            <th>Fecha cita</th>
                            <th>Codigo cliente</th>
                            <th>Codigo empleado</th>
                            <th>Total cita</th>
                            <th colSpan="3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map (item => 
                                <tr align= "center" key={item.id_cita}>
                                    <td>{dateFormatter(item.fecha_cita)}</td>
                                    <td>{item.rCliente}</td>
                                    <td>{item.rEmp}</td>
                                    <td>{item.totalCita}</td>
                                    <td><Link to={`/EditCitas/${item.id_cita}`}><button type="submit">Actualizar</button></Link></td>
                                    <td><Link to={`/EditEstatus/${item.id_cita}`}><button type="submit">Asistencia</button></Link></td>
                                    <td><Link to={`/DetailsCitas/${item.id_cita}`}><button type="submit">Detalles</button></Link></td>
             
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }

}

export default ListCitas;