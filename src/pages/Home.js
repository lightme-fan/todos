import React from "react";
import { Modal, Select, Button } from "antd";
import 'antd/dist/antd.css'
import styled from "styled-components";
import { Input, Form, ButtonComponent, List, Label } from "../components";
import { useTodo } from "../hooks";

const { Option } = Select;

const ListItem = styled.li`
    display: grid;
    grid-template-columns: 1fr 106px 138px;
    gap: 16px;
    padding: 10px 0;
    border-bottom: 1px solid;
`

const Actions = styled.div`
    display: flex;
    justify-content: end;
    gap: 10px;
`

const Todos = styled.div`
    margin: 48px 0 20px 0;
`

const Item = styled.div`
    font-weight: 700;
`

const Completed = styled.div`
    display: flex;
    align-items: center;
    gap FONT-WEIGHT: 200;
    gap: 14px;
`
const FormModal = styled.div`
    display: grid;
    gap: 20px;
`

const Checkbox = styled.input`
    cursor: pointer;
`

const Home = () => {
    const {
        value,
        todos,
        isModalOpen,
        edtiTodo,
        setValue,
        setIsModalOpen,
        handleSubmitForm,
        handleCheckTodo,
        handleDeleteTodo,
        showModal,
        handleEditChange,
        handleSelectChange,
        handleOk,
    } = useTodo()

    return (
    <div>
        <Form onSubmit={handleSubmitForm}>            
            <Input
                type="text"
                onChange={(e) => setValue(e.target.value)}
                placeholder={"Type here ..."}
            />
            <ButtonComponent name="Submit" type="submit" disabled={value === "" && true} />
        </Form>
        <Todos>
            <ListItem  style={{ background: "aliceblue" }}>
                <Item>Todos</Item>
                <Item>Completed ?</Item>
                <Item>All Actions</Item>
            </ListItem>
            <List>
                {todos && todos.map(t => (
                    <ListItem key={t.id}>
                        <div>{t.name}</div>
                        <Completed>
                            <span>{t.isDone === false ? "No" : "Yes"}</span>
                            <Checkbox type="checkbox" onChange={() => handleCheckTodo(t.id)} checked={t.isDone} />
                        </Completed>
                        <Actions>
                            <Button ghost type="primary" disabled={t.isDone} onClick={() => showModal(t.id)}>Edit</Button>
                            <Button ghost danger type="primary" onClick={() => handleDeleteTodo(t.id)}>Delete</Button>
                        </Actions>
                    </ListItem>
                ))}
            </List>
        </Todos>
        <Modal
            title={`Edit todo`}
            open={isModalOpen}
            onOk={() => handleOk(edtiTodo && edtiTodo.id)}
            onCancel={() => setIsModalOpen(false)}
        >
            <FormModal>
                <Label>
                    <span>Change the name of your todo</span>
                    <input
                        type="text"
                        value={edtiTodo && edtiTodo.name}
                        onChange={handleEditChange}
                    />
                </Label>
                <Label>
                    <span>Is this todo already done?</span>
                    <Select
                        onChange={handleSelectChange}
                    >
                        <Option value={true}>Yes</Option>
                        <Option value={false}>Not yet</Option>
                    </Select>
                </Label>
            </FormModal>
        </Modal>
    </div>
  )
}

export default Home;