import React, {useState, useContext} from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import {Calendar} from 'primereact/calendar';//Fecha
import 'primereact/resources/themes/nova-light/theme.css';//Fecha
import 'primereact/resources/primereact.min.css';//Fecha
import 'primeicons/primeicons.css';//Fecha
import { useForm } from "react-hook-form";//Validar

import MyMap from "./MyMap";
import PositionContext from "../context/position/PositionContext";
import { es, provincias_aqp, distritos_aqp, DateFull } from "../resources";

//Formulario de denuncia
const FormReport = (props) => {
  
    //validacion
    const { register, handleSubmit, errors } = useForm();
    
    //Obtener la posicion
    const PositionsContext = useContext(PositionContext);
    const { currentPosition, UpdatePosition } = PositionsContext;
    
    //State para reportes
    const [currentReport, setCurrentReport] = useState( [] );
    
    //Extraer de valores de inspeccion
    const {
        rep_nombre,
        rep_celular1,
        rep_otro_celular,
        rep_celular2,
        //rep_provincia,
        //rep_distrito,
        rep_localidad,
        rep_direccion,
        rep_mas_preguntas,
        rep_fecha_encontro_chiri
    } = currentReport;
    let rep_provincia = [];
    let rep_distrito = [];

    //Visualizar el mapa
    const ViewMap = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            UpdatePosition([position.coords.latitude,position.coords.longitude]);
        });
    }

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
            {/* REP_PROVINCIA */}
            {/*<Form.Group controlId="rep_provincia">
                <Form.Label >Provincia</Form.Label>
                <Form.Control 
                    as="select"
                    name= 'rep_provincia'
                    value= {rep_provincia}
                    onChange= {OnChange}
                >
                    <option>Seleccione Provincia</option>
                    {provincias_aqp.map((e, key) => {
                        return <option key={key} value={e.provinciaId}>{e.provinciaName}</option>;
                    })} 
                </Form.Control>
            </Form.Group> 
            {/* REP_DISTRITO */}
            {/*<Form.Group controlId="rep_distrito">
                <Form.Label >Distrito</Form.Label>
                <Form.Control 
                    as="select"
                    name= 'rep_distrito'
                    value= {rep_distrito}
                    onChange= {OnChange}
                >
                    <option>Seleccione Distrito</option>
                    {distritos_aqp[rep_provincia].map((e, key) => {
                        return <option key={key} value={e.distritoId}>{e.distritoName}</option>;
                    })} 
                </Form.Control>
            </Form.Group> 
            {/* REP_LOCALIDAD */}
            <Form.Group controlId="rep_localidad">
                <Form.Label >Localidad</Form.Label>
                <Form.Control 
                    type='text'
                    name='rep_localidad'
                    defaultValue={rep_localidad}
                    onChange={OnChange}
                />
            </Form.Group>
            {/* REP_DIRECCION */}
            <Form.Group controlId="rep_direccion">
                <Form.Label >Dirección</Form.Label>
                <Form.Control 
                    type='text'
                    name='rep_direccion'
                    defaultValue={rep_direccion}
                    onChange={OnChange}
                />
            </Form.Group>
            {/* REP_UBICACION */}
            {console.log(currentPosition)}
            <Form.Group controlId="rep_ubicacion">
                <Form.Label >Ubicacion</Form.Label>
                <Button onClick={ViewMap}>Ver mapa</Button>
                <MyMap/>
            </Form.Group>
            {/* REP_MAS_PREGUNTAS */}
            <Form.Group controlId="rep_mas_preguntas">
                <Form.Label>Si dispone de 2 minutos, agradeceríamos que nos ayude con unas cortas preguntas más. Si su respuesta es SI seleccione el marcador caso contrario haga clic en ENVIAR REPORTE.</Form.Label>
                <Form.Check
                    type="checkbox"
                    name='rep_mas_preguntas'
                    checked={ rep_mas_preguntas }
                    onChange={OnChangeCheck}
                />
            </Form.Group>
            {rep_mas_preguntas? 
                (<>
                    {/* REP_VISTE_CHIRI */}
                    <Form.Group>
                        <Form.Label>Viste la chirimacha?</Form.Label>
                        <Col sm={10}> 
                            <Form.Check
                                type="radio"
                                name="rep_viste_chiri"
                                label="Sí, la vi y la capturé"
                                value="vi_capture"
                                id="vi_capture"
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                label="Si, la vi pero no la capturé."
                                name="rep_viste_chiri"
                                value="vi_no_capture"
                                id="vi_no_capture"
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                name="rep_viste_chiri"
                                label="No la vi, pero reconocí sus rastros (heces o huevos)."
                                value="no_vi_reconoci_rastros"
                                id="no_vi_reconoci_rastros"
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                        </Col>
                        {errors.rep_viste_chiri && <span className='alert-custom'>*Campo obligatorio</span>}
                    </Form.Group>
                    {/* REP_FECHA_ENCONTRO_CHIRI */}
                    <Form.Group controlId="rep_fecha_encontro_chiri">
                        <Form.Label>¿Cuándo encontraste la chirimacha o te diste cuenta de que estaba en ese lugar?</Form.Label>
                        <Calendar 
                            showIcon={true} 
                            locale={es} 
                            dateFormat="yy-mm-dd" 
                            name = 'rep_fecha_encontro_chiri'
                            value={new Date(rep_fecha_encontro_chiri)} 
                            onChange={OnChange}
                        />
                    </Form.Group>
                </>):null
            }
            <Button type='submit'>Enviar reporte</Button> 
        </Form>
      </>
    );
}

export default FormReport;
