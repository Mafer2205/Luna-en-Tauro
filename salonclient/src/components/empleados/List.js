import { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";


import { Container, Table, Alert, Navbar, NavItem } from "reactstrap";


class ListEmpleados extends Component {

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
        axios.get ("http://localhost:5000/api/empleados", {
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


        return (
            
            <Container>

                <Navbar expand="lg" className="navheader">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mx-auto">
                        <NavItem>
                            <Link to={'/AddEmpleados'} style={{color:"white"}} className="nav-link">Agregar Empleado     |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListEmpleados'} style={{color:"white"}} className="nav-link">Ver Empleados</Link>
                        </NavItem>
                        </ul>
                    </div>
                </Navbar>
                
                <Table striped bordered hover>
                    <thead>
                        <tr align= "center">

                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Telefono</th>
                            <th>Estatus</th>
                            <th colSpan="3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map (item => 
                                <tr align= "center" key={item.id_emp}>
                                    <td>{item.nomb_emp}</td>
                                    <td>{item.app_emp}</td>
                                    <td>{item.tel_emp}</td>
                                    <td>{item.estatus}</td>
                                    <td><Link to={`/Edit/${item.id_emp}`}><button type="submit">Actualizar</button></Link></td>
                                    <td><Link to={`/EditEstatusEmp/${item.id_emp}`}><button type="submit">Estatus</button></Link></td>
                                    <td><Link to={`/Details/${item.id_emp}`}><button type="submit">Detalles</button></Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }

}

export default ListEmpleados;