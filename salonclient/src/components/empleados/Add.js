import { Component } from 'react';
import axios from 'axios';
import { Redirect , Link } from "react-router-dom";

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

class AddEmpleado extends Component {

    constructor (props) {
        super (props);

        var token = localStorage.getItem("ACCESS_TOKEN");

        this.state = {
            idEmp: '',
            nombEmp: '',
            appEmp: '',
            telEmp: '',
            correoEmp: '',
            contrasena: '',
            fechaIng: '',
            estatus: '',
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
        axios.post ("http://localhost:5000/api/agregarempleados", 
            {
                nombEmp: this.state.nombEmp,
                appEmp: this.state.appEmp,
                telEmp: this.state.telEmp,
                correoEmp: this.state.correoEmp,
                contrasena: this.state.contrasena,
                fechaIng: this.state.fechaIng,
                estatus: 'Activa'
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
                idEmp: '',
                nombEmp: '',
                appEmp: '',
                telEmp: '',
                correoEmp: '',
                contrasena: '',
                fechaIng: '',
                estatus: '',
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
                            pathname: '/ListEmpleados',
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
                            <Link to={'/AddEmpleados'} style={{color:"white"}} className="nav-link">Agregar Empleado     |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListEmpleados'} style={{color:"white"}} className="nav-link">Ver Empleados</Link>
                        </NavItem>
                        </ul>
                    </div>
                </Navbar>
                <br/>
                <h4 className="PageHeading">Ingrese informacion de nuevo empleado</h4>
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
                                <Input type="text" name="nombEmp" onChange={this.handleChange} value={this.state.nombEmp} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Apellidos</Label>
                            <Col sm={2}>
                                <Input type="text" name="appEmp" onChange={this.handleChange} value={this.state.appEmp} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Telefono</Label>
                            <Col sm={2}>
                                <Input type="text" name="telEmp" onChange={this.handleChange} value={this.state.telEmp} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Correo</Label>
                            <Col sm={2}>
                                <Input  type="text" name="correoEmp" value={this.state.correoEmp} onChange={this.handleChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Contrasena</Label>
                            <Col sm={2}>
                                <Input  type="text" name="contrasena" value={this.state.contrasena} onChange={this.handleChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Fecha de ingreso</Label>
                            <Col sm={2}>
                                <Input bsSize="md" type="date" name="fechaIng" onChange={this.handleChange} value={this.state.fechaIng} />
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

export default AddEmpleado;