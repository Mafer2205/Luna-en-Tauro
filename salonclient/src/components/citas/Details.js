import { Component } from "react";
import { Redirect, Link } from "react-router-dom";
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

class DetailsCita extends Component {

    constructor (props) {
        super (props);

        const token = localStorage.getItem ("ACCESS_TOKEN");

        this.state = {    
            idCita: 0,
            fechaCita: '',
            asistio: '',
            rCliente: '',
            rServ: '',
            rPromo: '',
            rEmp: '',
            totalCita: '',
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

        axios.get (`http://localhost:5000/api/citas/${id}`,
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
                            idCita: data.idCita,
                            fechaCita: data.fechaCita.substr (0, 10),
                            asistio: data.asistio,
                            rCliente: data.rCliente,
                            rServ: data.rServ,
                            rPromo: data.rPromo,
                            rEmp: data.rEmp,
                            totalCita: data.totalCita
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
                <Form className="form">
                <Col>
                        <FormGroup row>
                            <Label for="name" sm={2}>Fecha cita</Label>
                            <Col sm={2}>
                                <Input bsSize="md" type="date" name="fechaCita" onChange={this.handleChange} value={this.state.fechaCita} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Asistio</Label>
                            <Col sm={2}>
                                <Input type="text" name="asistio" onChange={this.handleChange} value={this.state.asistio} />
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

export default DetailsCita;