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

class EditRecomp extends Component {

    constructor (props) {
        super (props);

        const token = localStorage.getItem ("ACCESS_TOKEN");

        this.state = {    
            idCliente: 0,   
            nombCliente: '',
            appCliente: '',
            telCliente: '',
            correoCliente: '',
            noVisitas: '',
            noRecomp: '',
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

        axios.get (`http://localhost:5000/api/clientes/${id}`,
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
                            idCliente: data.idCliente,
                            nombCliente: data.nombCliente,
                            appCliente: data.appCliente,
                            telCliente: data.telCliente,
                            correoCliente: data.correoCliente,
                            noVisitas: data.noVisitas,
                            noRecomp: data.noRecomp
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

        axios.put (`http://localhost:5000/api/actualizarrecompensa/${id}`,
        {
            idCliente: id,
            nombCliente: this.state.nombCliente,
            appCliente: this.state.appCliente,
            telCliente: this.state.telCliente,
            correoCliente: this.state.correoCliente,
            noVisitas: this.state.noVisitas,
            noRecomp: this.state.noRecomp
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
                            <Link to={'/AddClientes'} style={{color:"white"}}  className="nav-link">Agregar Cliente     |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListCliente'} style={{color:"white"}} className="nav-link">Ver Clientes</Link>
                        </NavItem>
                        </ul>
                    </div>
                </Navbar>
                <br/>
                <h4 className="PageHeading">Actualiza la informacion de visitas del cliente</h4>
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
                            <Label for="name" sm={2}>No. visitas</Label>
                            <Col sm={2}>
                                <Input  type="text" name="noVisitas" value={this.state.noVisitas} onChange={this.handleChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>No. recompensas</Label>
                            <Col sm={2}>
                                <Input type="text" name="noRecomp" onChange={this.handleChange} value={this.state.noRecomp} />
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

export default EditRecomp;