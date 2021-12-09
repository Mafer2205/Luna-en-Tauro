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
    Col,
    Alert, Navbar, NavItem
} from 'reactstrap';

class EditServicio extends Component {

    constructor (props) {
        super (props);

        const token = localStorage.getItem ("ACCESS_TOKEN");

        this.state = {    
            idServ: 0,   
            nombServ: '',
            descripServ: '',
            costoServ: '',
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

        axios.get (`http://localhost:5000/api/servicios/${id}`,
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
                            idServ: data.idServ,
                            nombServ: data.nombServ,
                            descripServ: data.descripServ,
                            costoServ: data.costoServ
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

        axios.put (`http://localhost:5000/api/actualizarservicio/${id}`,
        {
            idServ: id,
            nombServ: this.state.nombServ,
            descripServ: this.state.descripServ,
            costoServ: this.state.costoServ
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
                            pathname: '/ListServicios',
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
                            <Link to={'/AddServicios'} style={{color:"white"}} className="nav-link">Agregar Servicio     |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListServicios'} style={{color:"white"}} className="nav-link">Ver Servicios</Link>
                        </NavItem>
                        </ul>
                    </div>
                </Navbar>
                <br/>
                <h4 className="PageHeading">Actualiza la informacion del servicio</h4>
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
                            <Label for="name" sm={2}>Nombre</Label>
                            <Col sm={2}>
                                <Input type="text" name="nombServ" onChange={this.handleChange} value={this.state.nombServ} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Descripcion</Label>
                            <Col sm={2}>
                                <Input type="text" name="descripServ" onChange={this.handleChange} value={this.state.descripServ} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Costo</Label>
                            <Col sm={2}>
                                <Input type="text" name="costoServ" onChange={this.handleChange} value={this.state.costoServ} />
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

export default EditServicio;