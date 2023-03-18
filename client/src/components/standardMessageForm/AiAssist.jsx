import React, { useState, useEffect } from 'react';
import { usePostAiAssistTextMutation } from '../../state/api';
import MessageFormUI from './MessageFormUI';

function useDebounce (value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

const AiAssist = ({ props, activeChat }) => {
    const [message, setMessage] = useState("");
    const [attachment, setAttachment] = useState("");
    const [attachedMessage, setAttachedMessage] = useState("");
    const [trigger, response] = usePostAiAssistTextMutation();


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
            activeChatId: activeChat.id
        };

        props.onSubmit(form);
        trigger(form);
        setMessage("");
        setAttachment("");
    };

    const handleMessage = (e) => {
        setMessage(e.target.value);
    };

    const debouncedValue = useDebounce(message, 1000);

    useEffect(() => {
        if (debouncedValue) {
            trigger({ text: debouncedValue });
        }
    }, [debouncedValue]);

    const handleKeyDown = (e) => {
        if (e.keyCode == 9 || e.keyCode == 13) {
            e.preventDefault();
            setMessage(`${message} ${attachedMessage}`);
        }
        setAttachedMessage("");
    };

    useEffect(() => {
        if (response.data?.text) {
            setAttachedMessage(response.data?.text);

        }
    }, [response]);



    return (
        <>
            <MessageFormUI
                setAttachment={setAttachment}
                message={message}
                handleSubmit={handleSubmit}
                handleMessage={handleMessage}
                handleKeyDown={handleKeyDown}
                attachedMessage={attachedMessage}
            />
        </>
    );
};

export default AiAssist;
