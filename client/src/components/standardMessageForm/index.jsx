import React, { useState } from 'react';
import MessageFormUI from './MessageFormUI';

const StandardMessageForm = ({ props, activeChat }) => {
    const [message, setMessage] = useState("");
    const [attachment, setAttachment] = useState("");
    const handleSubmit = async () => {
        const date = new Date()
            .toISOString()
            .replace("T", " ")
            .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
        const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
        const form = {
            attachments: at,
            created: date,
            sender_username: props.username,
            text: message,
            activeChatId: activeChat.id,
        };
        props.onSubmit(form);
        setMessage("");
        setAttachment("");
    };
    const handleMessage = (e) => {
        setMessage(e.target.value);
    };


    return (
        <>
            <MessageFormUI
                setAttachment={setAttachment}
                message={message}
                handleSubmit={handleSubmit}
                handleMessage={handleMessage}
            />
        </>
    );
};

export default StandardMessageForm;
