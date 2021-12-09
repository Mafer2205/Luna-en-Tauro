import { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";


import { Container, Table, Alert, Navbar, NavItem } from "reactstrap";


class ListServicios extends Component {

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
        axios.get ("http://localhost:5000/api/servicios", {
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
                            <Link to={'/AddServicios'} style={{color:"white"}} className="nav-link">Agregar Servicio     |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListServicios'} style={{color:"white"}} className="nav-link">Ver Servicios</Link>
                        </NavItem>
                        </ul>
                    </div>
                </Navbar>
                
                <Table striped bordered hover>
                    <thead>
                        <tr align= "center">

                            <th>Nombre</th>
                            <th>Costo</th>
                            <th colSpan="2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map (item => 
                                <tr align= "center" key={item.id_serv}>
                                    <td>{item.nomb_serv}</td>
                                    <td>{item.costo_serv}</td>
                                    <td><Link to={`/EditServicios/${item.id_serv}`}><button type="submit">Actualizar</button></Link></td>
                                    <td><Link to={`/DetailsServicios/${item.id_serv}`}><button type="submit">Detalles</button></Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }

}

export default ListServicios;