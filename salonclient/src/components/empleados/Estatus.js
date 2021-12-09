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
    Col,
    Alert, Navbar, NavItem
} from 'reactstrap';

class EditEmpleadoE extends Component {

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
        this.add = this.add.bind(this);
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

    add () {
        const id = this.props.match.params.id

        axios.put (`http://localhost:5000/api/actualizarempleado/${id}`,
        {
            idEmp: id,
            nombEmp: this.state.nombEmp,
            appEmp: this.state.appEmp,
            telEmp: this.state.telEmp,
            correoEmp: this.state.correoEmp,
            contrasena: this.state.contrasena,
            fechaIng: this.state.fechaIng,
            estatus: this.state.estatus
        },
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            }
        }).then (
            (response) => {
                if (response.status === 200) {
                    this.setState (
                        {
                            isSubmitted: true,
                            error: false
                        }
                    )
                }
                console.log(response);
            },
            (error) => {
                this.setState (
                    {
                        isSubmitted: true,
                        error: true
                    }
                )
                console.log (error);
            }
        )
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
                <h4 className="PageHeading">Actualiza la informacion del estatus del empleado</h4>
                <br/>
                <Alert 
                    isOpen={this.state.isSubmitted} 
                    color={!this.state.error ? "success" : "warning"}
                    toggle={() => this.setState ({ isSubmitted: false })}
                >
                    {!this.state.error ? "Informacion guardada!" : "Un error ocurrio mientras se guardaba la informacion"}
                </Alert>
                <Form className="form">
                    <Col>
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
                                <Button color="primary" onClick={this.add}>Aceptar</Button>
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

export default EditEmpleadoE;