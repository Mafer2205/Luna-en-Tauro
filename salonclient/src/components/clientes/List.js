import { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";


import { Container, Table, Alert, Navbar, NavItem } from "reactstrap";


class ListClientes extends Component {

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
        axios.get ("http://localhost:5000/api/clientes", {
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
                            <Link to={'/AddClientes'} style={{color:"white"}}  className="nav-link">Agregar Cliente     |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListCliente'} style={{color:"white"}}  className="nav-link">Ver Clientes</Link>
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
                            <th>No. recompensas</th>
                            <th colSpan="3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map (item => 
                                <tr align= "center" key={item.id_cliente}>
                                    <td>{item.nomb_cliente}</td>
                                    <td>{item.app_cliente}</td>
                                    <td>{item.tel_cliente}</td>
                                    <td>{item.norecomp}</td>
                                    <td><Link to={`/EditCliente/${item.id_cliente}`}><button type="submit">Actualizar</button></Link></td>
                                    <td><Link to={`/EditVisitas/${item.id_cliente}`}><button type="submit">Visitas</button></Link></td>
                                    <td><Link to={`/DetailsCliente/${item.id_cliente}`}><button type="submit">Detalles</button></Link></td>   
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }

}

export default ListClientes;