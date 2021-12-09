import { Component } from "react";

import { Container} from "reactstrap";


class Desarrollador extends Component {

    render () {
        return (
            
            <Container>
                <h3 align="center">¿Que se tiene detrás del desarrollo del sistema de Luna en Tauro?</h3>
                <br/>
                <div align="center"><img border="10" align="center" src ="./Yo.jpeg" alt="Desarrolladora" width= "260" height ="350"/></div>            
                <br/>   
                <br/>
                <h5 style={{color:"black"}} align="center"> Maria Fernanda Garcia Gordillo, la desarrolladora detras del sistema basado en web para el Salon de Belleza: Luna en Tauro.</h5>     
                <h5 style={{color:"black"}} align="center">Estudiante del Septimo semestre de la carrera de Ingenieria Informatica en la Universidad Veracruzana de la Region Veracruz.</h5>    
                <h5 style={{color:"black"}} align="center">El sistema fue creado con .NET, REACT y apoyado en una base de datos manejada desde MySQL. </h5>       
                <br/>   

            </Container>
        );
    }

}

export default Desarrollador;