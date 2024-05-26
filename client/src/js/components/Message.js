//components/Message.js

import '../../css/style.css';
import logo from '../../../public/static/assets/j_logo.png';
import Text from './Text';
import DOMPurify from 'dompurify';

function Message({ messages }) {
    return (
        <div id="message-container">
            {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                    {msg.type === 'j' && (
                        <div id='icon'><img src={logo} alt="j Icon" className="icon" /></div>) 
                    }
                    {msg.type === 'user' && <><b style={{fontSize: '18px'}}>YOU: </b> <br ></br></>}
                    {typeof msg.content === 'string'
                      ? <span>{msg.content}</span>
                      : msg.content
                    }
                    {/* Fixed the issue with the dangerouslySetInnerHTML prop, should adjust later to a safer approach */}
                    <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.html) || msg.text }} />
                </div>
            ))}
        </div>
    );
}

const welcomeMessageParts = [
    { text: 'Welcome to j AI assistant! ', style: 'highlighted' },
    { text: 'I can provide you insights about the professional life of ', style: 'normal' },
    { text: 'João Rocha', style: 'highlighted' },
    { text: '. You can ask me anything regarding his portfolio, professional experience and skills, job history and education, or any other inquiries you may have.', style: 'normal' }
];

const WelcomeMessage = () => {
    return <Text parts={welcomeMessageParts} />;
} 

export default Message;
export { WelcomeMessage };
