import { Component } from 'react';
import { Redirect, Link  } from "react-router-dom";
import axios from 'axios';

import {
    Container,
    FormGroup,
    Button, 
    Input,
    Form,
    Label,
    Col,
    Alert, Navbar, NavItem
} from 'reactstrap';

class AddCliente extends Component {

    constructor (props) {
        super (props);

        var token = localStorage.getItem("ACCESS_TOKEN");

        this.state = {
            idCliente: '',
            nombCliente: '',
            appCliente: '',
            telCliente: '',
            correoCliente: '',
            noVisitas: '',
            noRecomp: '',
            token: token,
            isSubmitted: '',
            error: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.add = this.add.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    handleChange (e) {
        this.setState (
            {
                [e.target.name]: e.target.value
            }
        )
    }

    add (e) {
        axios.post ("http://localhost:5000/api/agregarclientes", 
            {
                nombCliente: this.state.nombCliente,
                appCliente: this.state.appCliente,
                telCliente: this.state.telCliente,
                correoCliente: this.state.correoCliente,
                noVisitas: 0,
                noRecomp: 0
            }, 
            {
                headers: {
                    'Content-type': "application/json",
                    'Authorization': `Bearer ${this.state.token}`
                }
            }
        ).then (
            (response) => {
                if (response.status === 200) {
                    this.cancel ();
                    this.setState (
                        {
                            isSubmitted: true,
                            error: false
                        }
                    );
                }
            },
            (error) => {
                this.setState (
                    {
                        isSubmitted: true,
                        error: true
                    }
                );
                console.log(error);
            }
        );
    }

    cancel (e) {
        this.setState (
            {
                idCliente: '',
                nombCliente: '',
                appCliente: '',
                telCliente: '',
                correoCliente: '',
                noVisitas: '',
                noRecomp: '',
                isCanceled: true
            }
        );
    }

    render () {

        if (this.state.isCanceled) 
        {
            return (
                <Redirect
                    to = 
                    {
                        {
                            pathname: '/ListCliente',
                            state: {
                                from: this.props.location
                            }
                        }
                    }
                />
            );
        }

        return (
            <Container className="App">
                <Navbar expand="lg" className="navheader">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mx-auto">
                        <NavItem>
                            <Link to={'/AddClientes'} style={{color:"white"}} className="nav-link">Agregar Cliente     |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListCliente'} style={{color:"white"}} className="nav-link">Ver Clientes</Link>
                        </NavItem>
                        </ul>
                    </div>
                </Navbar>
                <br/>
                <h4 className="PageHeading">Ingrese informacion de nuevo cliente</h4>
                <br/>
                <Alert
                    isOpen={this.state.isSubmitted}
                    color={!this.state.error ? "success" : "warning"}
                    toggle={() => this.setState ({isSubmitted: false})}
                >
                    {!this.state.error ? "Informacion guardada!" : "Un error ocurrio mientras se guardaba la informacion"}
                </Alert>
                <Form className="form">
                    <Col>
                        <FormGroup row>
                            <Label for="name" sm={2}>Nombre</Label>
                            <Col sm={2}>
                                <Input type="text" name="nombCliente" onChange={this.handleChange} value={this.state.nombCliente} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Apellidos</Label>
                            <Col sm={2}>
                                <Input type="text" name="appCliente" onChange={this.handleChange} value={this.state.appCliente} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Telefono</Label>
                            <Col sm={2}>
                                <Input type="text" name="telCliente" onChange={this.handleChange} value={this.state.telCliente} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Correo</Label>
                            <Col sm={2}>
                                <Input  type="text" name="correoCliente" value={this.state.correoCliente} onChange={this.handleChange} />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup row>
                            <Col sm={5}>
                            </Col>
                            <Col sm={1}>
                                <Button color="primary" onClick={this.add}>Aceptar</Button>
                            </Col>
                            <Col sm={1}>
                                <Button color="secondary" onClick={this.cancel}>Cancelar</Button>{' '}
                            </Col>
                            <Col sm={5}>
                            </Col>
                        </FormGroup>
                    </Col>
                </Form>
            </Container>
        );
    }

}

export default AddCliente;