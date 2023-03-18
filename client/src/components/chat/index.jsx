import React from 'react';
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from 'react-chat-engine-advanced';
import CustomHeader from '../customHeader';
import StandardMessageForm from '../standardMessageForm';
import Ai from '../standardMessageForm/Ai';
import AiAssist from '../standardMessageForm/AiAssist';

const PROJECT_ID = import.meta.env.VITE_CHAT_PROJECT_ID;
// const PROJECT_ID = 'fa984b3b-26da-40eb-b5a3-a71f444c286b';
const USER = 'testuser';
const PWD = '1234';

const Chat = ({ username, secret }) => {
    const chatProps = useMultiChatLogic(PROJECT_ID, username, secret);
    return (
        <div>
            <MultiChatSocket {...chatProps} />
            <MultiChatWindow
                {...chatProps}
                style={{ height: '100vh' }}
                renderChatHeader={(chat) => <CustomHeader chat={chat} />}
                renderMessageForm={props => {
                    if (chatProps.chat?.title.startsWith("AiChat_")) {
                        return <Ai props={props} activeChat={chatProps.chat} />;
                    }
                    if (chatProps.chat?.title.startsWith("AiAssist_")) {
                        return <AiAssist props={props} activeChat={chatProps.chat} />;
                    }
                    return (
                        <StandardMessageForm props={props} activeChat={chatProps.chat} />
                    );
                }}
            />
        </div>
    );
};

export default Chat;
