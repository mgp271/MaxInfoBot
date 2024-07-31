import { useEffect, useState, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import botIcon from '../assets/head-sm.svg';
import botEyes from '../assets/head-eyes.svg';
import './max.css';

function Basic(){
    const [chat,setChat] = useState([]);
    const [inputMessage,setInputMessage] = useState('');
    const [botTyping,setbotTyping] = useState(false);
    const blinkingRef = useRef(null);
    const greetingTypeRef = useRef(null);
    const nameGreetingRef = useRef(null);

    const [headerClass, setHeaderClass] = useState('cardHeader'); // State for managing header class
    const messageAreaRef = useRef(null); // Ref for the message area

    useEffect(()=>{
   
        console.log("called");
        const objDiv = document.getElementById('messageArea');
        objDiv.scrollTop = objDiv.scrollHeight;
        
    
    },[chat])

    useEffect(() => {
        // Initial blinking on page load
        if (blinkingRef.current) {
            blinkingRef.current.classList.add('initial-blink');
        }
        if (greetingTypeRef.current) {
            greetingTypeRef.current.classList.add('greeting-type');
        }
        if (nameGreetingRef.current) {
            nameGreetingRef.current.classList.add('name-greeting');
        }

        const timer = setTimeout(() => {
            if (blinkingRef.current) {
                blinkingRef.current.classList.remove('initial-blink');
            }
            if (greetingTypeRef.current) {
                greetingTypeRef.current.classList.remove('greeting-type');
            }
            if (nameGreetingRef.current) {
                nameGreetingRef.current.classList.remove('name-greeting');
            }
        }, 1500);

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);

    useEffect(() => {
        // Blinking when the bot starts typing
        if (botTyping) {
            blinkingRef.current.classList.add('blinking');
        } else {
            blinkingRef.current.classList.remove('blinking');
            // blinkingRef.current.style.display = "none";
        }
    }, [botTyping]);

    useEffect(()=>{
            console.log("called");
            const objDiv = document.getElementById('messageArea');
            objDiv.scrollTop = objDiv.scrollHeight;
        },[chat])

    useEffect(() => {
        // Add scroll event listener to detect scrolling in message area
        const handleScroll = () => {
            if (messageAreaRef.current.scrollTop > 0) {
                setHeaderClass('cardHeader scrolled');
            } else {
                setHeaderClass('cardHeader');
            }
        };

        const messageArea = messageAreaRef.current;
        messageArea.addEventListener('scroll', handleScroll);

        return () => {
            messageArea.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSubmit=(evt)=>{
        evt.preventDefault();
        const name = "MaxInfoBot";
        const request_temp = {sender : "user", sender_id : name , msg : inputMessage};
        
        if(inputMessage !== ""){
            
            setChat(chat => [...chat, request_temp]);
            setbotTyping(true);
            setInputMessage('');
            rasaAPI(name,inputMessage);
        }
        else{
            window.alert("Please enter valid message");
        }
        
    }

    const rasaAPI = async function handleClick(name, msg) {
        try {
            const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'charset': 'UTF-8',
                },
                credentials: "same-origin",
                body: JSON.stringify({ "sender": name, "message": msg }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
    
            if (data && data.length > 0) {
                const temp = data[0];
                const recipient_id = temp["recipient_id"];
                const recipient_msg = temp["text"];
                const response_temp = { sender: "bot", recipient_id: recipient_id, msg: recipient_msg };
                setbotTyping(false);
                setChat(chat => [...chat, response_temp]);
            }
        } catch (error) {
            console.error('Error:', error);
            const errorMsg = { sender: "bot", msg: `Sorry, human, I'm down or having technical difficulties. However, here is Matt's contact information:
            Phone Number: 480.216.8765
            Email: mgp271@gmail.com` };
            setbotTyping(false);
            setChat(chat => [...chat, errorMsg]);
        }
    }    

    console.log(chat);

    const stylecard = {
        maxWidth : '100%',
        paddingLeft: '0px',
        paddingRight: '0px',
        borderRadius: '30px',
        border: '0px',

    }
    const styleHeader = {
        borderRadius: '0px 0px 0px 0px',
        backgroundColor: '#1d1b22',
        color: '#fff',
    }
    const styleFooter = {
        borderRadius: '0px 0px 0px 0px',
        backgroundColor: '#1d1b22',
        padding: '15px',
        width: '100%',
    }
    const styleBody = {
        padding : '15px',
        height: '28rem',
        overflowY: 'a',
        overflowX: 'hidden',
        
    }

    return (
      <div>
        {/* <button onClick={()=>rasaAPI("Matt","hi")}>Try this</button> */}
        
        <div className="container-fluid">
        <div className="row justify-content-center">
            
                <div className="card" style={stylecard}>
                    <div className={headerClass} style={styleHeader}>
                        <img className="bot-eyes initial-blink blinking" ref={blinkingRef} style={{marginRight: '15px'}} src={botEyes} height="128px" width="128px" alt="botEyes" />
                        <img className="bot" style={{marginRight: '15px'}} src={botIcon} height="128px" width="128px" alt="bot" />
                        <div className="bot-desc">
                            <h1 className="greeting" ref={greetingTypeRef} style={{marginBottom:'0px'}}>Greetings Human</h1>
                            <h2 ref={nameGreetingRef}>I am <span>MAX</span></h2>
                            {/* {botTyping ? <h6>Bot Typing....</h6> : null} */}
                        </div> 
                        <div className="bot-desc-scrolled">
                            <h2>I am <span>MAX</span></h2>
                        </div>     
                    </div>
                    <div className="cardBody" id="messageArea" ref={messageAreaRef} style={styleBody}>
                        <div className="row msgarea">
                            {chat.map((user,key) => (
                                <div key={key}>
                                    {user.sender==='bot' ?
                                        (
                                            
                                            <div className= 'msgalignstart'>
                                                <img className="botIcon" style={{padding: '5px'}} src={botIcon} height="58px" width="58px" alt="botIcon" />
                                                <h5 className="botmsg">{user.msg}</h5>
                                            </div>
                                        
                                        )

                                        :(
                                            <div className= 'msgalignend'>
                                                <h5 className="usermsg">{user.msg}</h5>
                                                <FaUserCircle className="userIcon" style={{padding: '5px'}} />
                                            </div>
                                        )
                                    }
                                </div>
                            ))} 
                        </div>
                
                    </div>
                    <div className="cardFooter text-white" style={styleFooter}>
                        <div className="row">
                            <form className="form" style={{display: 'flex', justifyContent: 'space-evenly'}} onSubmit={handleSubmit}>
                                <div className="w-100" style={{marginRight:'15px'}}>
                                    <input onChange={e => setInputMessage(e.target.value)} value={inputMessage} type="text" className="msginp"></input>
                                </div>
                                <div className="cola">
                                    <button type="submit" className="circleBtn" ><IoMdSend className="sendBtn" /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
}

export default Basic;