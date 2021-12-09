import { Component } from 'react';
import axios from 'axios';
import { Redirect, Link  } from "react-router-dom";

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

class AddCita extends Component {

    constructor (props) {
        super (props);

        var token = localStorage.getItem("ACCESS_TOKEN");

        this.state = {
            idCita: '',
            fechaCita: '',
            asistio: '',
            rCliente: '',
            rServ: '',
            rPromo: '',
            rEmp: '',
            totalCita: '',
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
        axios.post ("http://localhost:5000/api/agregarcitas", 
            {
                fechaCita: this.state.fechaCita,
                asistio: 'Pend',
                rCliente: this.state.rCliente,
                rServ: this.state.rServ,
                rPromo: this.state.rPromo,
                rEmp: this.state.rEmp,
                totalCita: this.state.totalCita
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
                idCita: '',
                fechaCita: '',
                asistio: '',
                rCliente: '',
                rServ: '',
                rPromo: '',
                rEmp: '',
                totalCita: '',
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
                            pathname: '/ListCitas',
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
                            <Link to={'/AddCitas'} style={{color:"white"}} className="nav-link">Agregar Cita     |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListCitas'} style={{color:"white"}} className="nav-link">Ver Citas</Link>
                        </NavItem>
                        </ul>
                    </div>
                </Navbar>
                <br/>
                <h4 className="PageHeading">Ingrese informacion de nueva cita</h4>
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
                            <Label for="name" sm={2}>Fecha cita</Label>
                            <Col sm={2}>
                                <Input bsSize="md" type="date" name="fechaCita" onChange={this.handleChange} value={this.state.fechaCita} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Codigo cliente</Label>
                            <Col sm={2}>
                                <Input type="text" name="rCliente" onChange={this.handleChange} value={this.state.rCliente} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Codigo servicio</Label>
                            <Col sm={2}>
                                <Input  type="text" name="rServ" value={this.state.rServ} onChange={this.handleChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Codigo promocion</Label>
                            <Col sm={2}>
                                <Input  type="text" name="rPromo" value={this.state.rPromo} onChange={this.handleChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Codigo empleado</Label>
                            <Col sm={2}>
                                <Input  type="text" name="rEmp" value={this.state.rEmp} onChange={this.handleChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Costo total</Label>
                            <Col sm={2}>
                                <Input  type="text" name="totalCita" value={this.state.totalCita} onChange={this.handleChange} />
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

export default AddCita;