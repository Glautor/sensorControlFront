import React from 'react';
import axios from 'axios';

export default function Form(props) {
    const handleRequest = () => {
        if(props.topic === '') {
            props.setError('você não pode fazer uma requisição sem tópico')
            return
        }
        axios.post(`${props.url}`, { topic: props.topic, msg: props.message })
        .then(res => {
            props.setError('')
            props.onChangeTopics(props.topic)
            props.onChangeMessages(props.messages)
            props.onChangeTopic('')
            console.log(res.data);
        })
    }
    return (
        <>
            <label>
                Tópico:<br/>
                <input type="text" name="topic" value={props.topic} onChange={props.onChangeTopic} />
            </label>
            <br/>
            <label>
                Mensagem:<br/>
                <input type="text" name="message" value={props.message} onChange={props.onChangeMessage} />
            </label>
            <br/>
            <button onClick={handleRequest}>Enviar</button>
        </>
    );
}
