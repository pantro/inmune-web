import React, {useState, useContext} from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import {Calendar} from 'primereact/calendar';//Fecha
import 'primereact/resources/themes/nova-light/theme.css';//Fecha
import 'primereact/resources/primereact.min.css';//Fecha
import 'primeicons/primeicons.css';//Fecha
import { useForm } from "react-hook-form";//Validar

//import { es, DateFull, initInspection, PutNA } from "../../../resources";

//Formulario de denuncia
const FormReport = (props) => {
  
    //validacion
    const { register, handleSubmit, errors } = useForm();
    
    //State para inspecciones
    const [currentReport, setCurrentReport] = useState( [] );
        
    //Extraer de valores de inspeccion
    const {
        rep_nombre,
        rep_celular1,
        rep_otro_celular,
        rep_celular2,
    } = currentReport;
        
    const OnChange = e => {
        setCurrentReport({
            ...currentReport,
            [e.target.name] : e.target.value
        });
    };

    const OnChangeCheck = e => {
        setCurrentReport({
            ...currentReport,
            [e.target.name] : e.target.checked
        });
    };

    const OnChangeCheckMultiple = e => {
        let name = e.target.value;
        setCurrentReport({
            ...currentReport,
            [name] : e.target.checked
        });
    };

    const OnSubmit = () => {
                
        
    };
    
    return (
      <>
        <h2>Reporte de la presencia de chirimachas</h2>     

        <Form onSubmit={handleSubmit(OnSubmit)}>  
            <label>Para comunicarnos contigo, darte indicaciones y hacer seguimiento de tu reporte te pedimos por favor nos indiques la siguiente información: </label> 
            {/* REP_NOMBRE */}
            <Form.Group controlId="rep_nombre">
                <Form.Label >Nombre*</Form.Label>
                <Form.Control 
                    type="text"
                    name= 'rep_nombre'
                    defaultValue= {rep_nombre}
                    onChange= {OnChange}
                    ref={register({ required: true })}
                />
                {errors.rep_nombre && <span className='alert-custom'>*Campo obligatorio</span>}
            </Form.Group>
            {/* REP_CELULAR1 */}
            <Form.Group controlId="rep_celular1">
                <Form.Label>Número de celular:</Form.Label>
                <Form.Control 
                    type='number'
                    name='rep_celular1'
                    defaultValue={rep_celular1}
                    onChange={OnChange}
                    ref={register({ maxLength: 9 })}
                />
                {errors.rep_celular1?.type === 'maxLength' && <span className='alert-custom'>*Maximo 9 numeros</span>}
            </Form.Group>
            <Form.Group controlId="rep_otro_celular">
                <Form.Check
                    type="checkbox"
                    name='rep_otro_celular'
                    label='Otro celular adicional'
                    checked={ rep_otro_celular }
                    onChange={OnChangeCheck}
                />
            </Form.Group>
            {rep_otro_celular? 
                (<>
                    {/* REP_CELULAR2 */}
                    <Form.Group controlId="rep_celular2">
                        <Form.Control 
                            type='number'
                            name='rep_celular2'
                            defaultValue={rep_celular2}
                            onChange={OnChange}
                            ref={register({ required: true, maxLength: 9 })}
                        />
                        {errors.rep_celular2?.type === 'required' && <span className='alert-custom'>*Campo obligatorio</span>}
                        {errors.rep_celular2?.type === 'maxLength' && <span className='alert-custom'>*Maximo 9 numeros</span>}
                    </Form.Group>
                </>):null
            }
            <Button type='submit'>Guardar</Button> 
        </Form>
      </>
    );
}

export default FormReport;
