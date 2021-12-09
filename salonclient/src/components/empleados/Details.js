import { Component } from "react";
import { Redirect, Link  } from "react-router-dom";
import axios from "axios";

import {
    Container,
    FormGroup,
    Button,
    Label,
    Input,
    Form,
    Col, Navbar, NavItem
} from 'reactstrap';

class DetailsEmpleado extends Component {

    constructor (props) {
        super (props);

        const token = localStorage.getItem ("ACCESS_TOKEN");

        this.state = {    
            idEmp: 0,   
            nombEmp: '',
            appEmp: '',
            telEmp: '',
            correoEmp: '',
            contrasena: '',
            fechaIng: '',
            estatus: '',
            token: token,
            error: false,
            isSubmitted: false,
            isCanceled: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount () {
        const id = this.props.match.params.id 

        axios.get (`http://localhost:5000/api/empleados/${id}`,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            }
        }).then (
            (response) => {
                if (response.status === 200) {
                    const data= response.data;
                    
                    this.setState (
                        { 
                            idEmp: data.idEmp,
                            nombEmp: data.nombEmp,
                            appEmp: data.appEmp,
                            telEmp: data.telEmp,
                            correoEmp: data.correoEmp,
                            contrasena: data.contrasena,
                            fechaIng: data.fechaIng.substr (0, 10),
                            estatus: data.estatus
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

    cancel (e) {
        this.setState (
            {
                isCanceled: true
            }
        );
    }
 
    handleChange (e) {
        this.setState (
            {
                [e.target.name]: e.target.value
            }
        )
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
            );
        }

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
                        <FormGroup row>
                            <Label for="name" sm={2}>Estatus</Label>
                            <Col sm={2}>
                                <Input type="text" name="estatus" onChange={this.handleChange} value={this.state.estatus} />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup row>
                            <Col sm={5}>
                            </Col>
                            <Col sm={1}>
                                <Button color="secondary" onClick={this.cancel} >Cancelar</Button>
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

export default DetailsEmpleado;