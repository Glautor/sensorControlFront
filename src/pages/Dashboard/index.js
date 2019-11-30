import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Form from '../../components/Form'
import './styles.css'

export default function Dashboard() {
    const [topic, setTopic] = useState('')
    const [topics, setTopics] = useState([])
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        function messageReq = setTimeout(() => {
            axios.post('localhost:4000/getMessageByTopic', { topics })
            .then(res => {
              setMessages([...messages, ...res.data.messages])
              console.log(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
        }, 3000)
        messageReq()
    }, [topics, messages])

    while(messages.indexOf('') != -1) {
        var index = messages.indexOf('');
        messages.splice(index, 1);
    }

    const onChangeTopics = (topic) => {
        topics.push(topic)
        messages.push(message)
        console.log(topics)
        console.log(messages)
    }

    const onChangeTopic = (event) => {
        if(event == '') setTopic('')
        else setTopic(event.target.value)
    }

     const onChangeMessage = (event) => {
        if(event == '') setMessage('')
        else setMessage(event.target.value)
    }
    return (
        <>
        <div className='container'>
            <Form url={'localhost:4000/sendMessage'}
                  topics={topics}
                  topic={topic}
                  message={message}
                  onChangeTopics={onChangeTopics}
                  onChangeTopic={onChangeTopic}
                  onChangeMessage={onChangeMessage}
                  error={error}
                  setError={(error) => setError(error)} />
        </div>
        <h4>Tópicos cadastrados</h4>
        { topics.map((topic, index) => {
            return(
                <p>
                <span>{index}: </span>
                <span>{topic}</span>
                </p>
            )
        })}
        <h4>Mensagens dos tópicos cadastrados</h4>
        { messages.map((message, index) => {
            return(
                <p>
                <span>{index}: </span>
                <span>{message}</span>
                </p>
            )
        })}
        </>
    )
}