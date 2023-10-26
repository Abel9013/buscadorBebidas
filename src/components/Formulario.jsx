import { useState } from "react"
import { Button, Form, Row, Col, Alert } from 'react-bootstrap'
import useCategorias from '../hooks/useCategorias'
import useBebidas from '../hooks/useBebidas'

const Formulario = () => {

    const [busqueda, setBusqueda] = useState({
        nombre:"",
        categoria:""
    })
    const{ categorias } = useCategorias()
    const [alerta, setAlerta] = useState("")
    const {consultarBebida}= useBebidas()
    const handleSubmit = e => {
        e.preventDefault()
        if(Object.values(busqueda).includes('')){
            setAlerta("Todos los campos son obligatorios")
            return
        }
        setAlerta('')
        consultarBebida(busqueda)
    }

return (
    <>
        <Form
            onSubmit={handleSubmit}
        >
            {alerta && <Alert variant="danger text-center">{alerta}</Alert>}
            <Row>
                <Col md={6}>
                    <Form.Group className='mb-3'>
                            <Form.Label htmlFor='nombre'>Nombre de bebida</Form.Label>
                            <Form.Control
                                id='nombre'
                                type='text'
                                name='nombre'
                                placeholder='Ej: Tequila, Vodka'
                                value={busqueda.nombre}
                                onChange={e => setBusqueda({...busqueda,
                                    [e.target.name]:e.target.value})}
                            >
        
                            </Form.Control>
                    </Form.Group>
     
                </Col>
                <Col md={6}>
                    <Form.Group className='mb-3'>
                            <Form.Label htmlFor='categoria'>Categoria bebida</Form.Label>
                            <Form.Select
                                id='categoria'
                                name='categoria'
                                value={busqueda.categoria}
                                onChange={e => setBusqueda({...busqueda,
                                    [e.target.name]:e.target.value})}
                            >
                                <option>-Selecciona Categoria-</option>
                                {categorias.map(categoria=>(
                                    <option
                                        key={categoria.strCategory}
                                        value={categoria.strCategory}
                                        
                                    >{categoria.strCategory}</option>
                                ))}
                            </Form.Select>
                    </Form.Group>
                </Col>
                
            </Row>
            <Row className='justify-content-end'>
                <Col md={3}>
                    <Button variant='danger' className='text-uppercase w-100' type="submit" >Buscar bebidas</Button>
                </Col>
            </Row>
        </Form>
    </>
  )
}

export default Formulario