import { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";


import { Container, Table, Alert, Navbar, NavItem } from "reactstrap";


class ListPromociones extends Component {

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
        axios.get ("http://localhost:5000/api/promociones", {
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
                            <Link to={'/AddPromociones'} style={{color:"white"}} className="nav-link">Agregar Promociones     |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListPromociones'} style={{color:"white"}} className="nav-link">Ver Promociones</Link>
                        </NavItem>
                        </ul>
                    </div>
                </Navbar>
                
                <Table striped bordered hover>
                    <thead>
                        <tr align= "center">

                            <th>Nombre</th>
                            <th>Fecha</th>
                            <th colSpan="1">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map (item => 
                                <tr align= "center" key={item.id_promo}>
                                    <td>{item.nomb_promo}</td>
                                    <td>{dateFormatter(item.fecha_promo)}</td>
                                    <td><Link to={`/DetailsPromociones/${item.id_promo}`}><button type="submit">Detalles</button></Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }

}

export default ListPromociones;