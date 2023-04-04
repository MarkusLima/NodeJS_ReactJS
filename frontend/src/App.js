import React, { useEffect, useState } from 'react';
import api from './api';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

export default function App() {
    const [lista, setLista] = useState([]);
    const [name, setName] = useState('');
    const [complete, setComplete] = useState('sim');
    const [id, setId] = useState('sim');
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseEdit = () => setShowEdit(false);

    useEffect( () => {
        reloadPage();
    }, []);

    async function reloadPage(){
       await api.get("/tasks")
        .then((response) => setLista(response.data) )
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
    }

    async function deleteList(id){
        await api.delete("/tasks/"+id)
        .then((response) => console.log(response.data) )
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });

       await reloadPage()
    }

    async function createList(){
        await api.post("/tasks/", {
            name: name,
            complete: complete
        }, {
            'content-type': 'application/json'
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
        setName('');
        setComplete('');
        setShow(false)
        
        await reloadPage()
    }

    function editList(id, name, complete){
        
        setShowEdit(true)
        setId(id);
        setName(name);
        setComplete(complete);
    }

    async function upList(){
        await api.put("/tasks/"+id, {
            name: name,
            complete: complete
        }, {
            'content-type': 'application/json'
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
        setName('');
        setComplete('');
        setShowEdit(false)
        
        await reloadPage()
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Lista de tarefas</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="primary" onClick={handleShow}>Adicionar tarefa</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome da tarefa</th>
                            <th>Concluída</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista ? lista.map(item => { return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.complete}</td>
                                <td>
                                    <ButtonToolbar aria-label="Toolbar with button groups">
                                        <ButtonGroup className="me-2" aria-label="First group">
                                            <Button variant="success" onClick={()=> editList(item.id, item.name, item.complete)} >Editar</Button>
                                            <Button variant="danger" onClick={()=> deleteList(item.id)}>Apagar</Button>
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}) : null}
                    </tbody>
                    </Table>
            </Container>

            <Modal show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title>Criar Tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Informe o nome da tarefa</Form.Label>
                            <Form.Control type="text" placeholder="exemplo: Comprar pão" onChange={(event)=>setName(event.target.value)} value={name} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tarefa concluída?</Form.Label>
                            <Form.Select onChange={(event)=>setComplete(event.target.value)} value={complete}>
                                <option>sim</option>
                                <option>nao</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>createList()}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEdit} onHide={handleCloseEdit}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title>Editar Tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Edite o nome da tarefa</Form.Label>
                            <Form.Control type="text" placeholder="exemplo: Comprar pão" onChange={(event)=>setName(event.target.value)} value={name} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tarefa concluída?</Form.Label>
                            <Form.Select onChange={(event)=>setComplete(event.target.value)} value={complete}>
                                <option>sim</option>
                                <option>nao</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>upList()}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}