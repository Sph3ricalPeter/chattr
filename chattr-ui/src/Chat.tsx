import {
  VStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { ChangeEvent, KeyboardEvent, FunctionComponent, useEffect, useState, useRef } from "react";
import Comment from "./Comment";
import { useDebouncedCallback } from "use-debounce";
import { socket } from "./SocketContext";
import { useAuth } from "./Auth";

type Message = {
  clientId: string;
  username: string;
  text: string;
  createdAt: string;
}

interface ConnectionStateProps {
  isConnected: boolean;
}

const ConnectionState = (props: ConnectionStateProps) => {
  return <p>State: {'' + props.isConnected}</p>;
}

const Chat: FunctionComponent = () => {

  const auth = useAuth();

  const [inputValue, setInputValue] = useState("");
  const onChangeDebounced = useDebouncedCallback((value) => {
    console.log("stopped typing");
  }, 500);

  const connect = () => {
    if (socket.disconnected) {
      console.log("connecting");
      socket.connect()
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onChangeDebounced(value);
  };

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleFetchData = async () => {
    const response = await fetch('http://localhost:4000/messages');
    const data = await response.json();
    setMessages(data);
  }

  useEffect(() => {
    connect();

    function onConnect() {
      setIsConnected(true);
      console.log("connected");
      handleFetchData();
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log("disconnected");
    }

    function onReceiveMessageEvent(payload: Message) {
      console.log(`[${payload.createdAt}; ${payload.clientId}] ${payload.username}: ${payload.text}`);
      setMessages(previous => [...previous, payload]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receiveMessage', onReceiveMessageEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receiveMessage', onReceiveMessageEvent);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (inputValue === '' || !auth.isSignedIn()) {
        return;
      }
      // 👇 Get input value
      socket.timeout(5000).emit('sendMessage', { username: auth.user?.username, message: inputValue });
      setInputValue('');
    }
  };

  const bottomRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <VStack w={"100%"}>
      <VStack
        mt={"1rem"}
        p={"1rem"}
        border={"1px"}
        borderRadius={"1rem"}
        borderColor={"whiteAlpha.100"}
        w={"100%"}
      >
        <VStack h={"60vh"} w={"100%"} overflow={"scroll"}>
          {isConnected && messages.length === 0 &&
            <VStack h={"100%"} justifyContent={"center"}><p>No messages yet</p></VStack>}
          {!isConnected && <VStack h={"100%"} justifyContent={"center"}><Button variant={"secondary"} onClick={connect}>Reconnect</Button></VStack>}
          {messages.length > 0 && messages.map((msg) => (
            <Comment author={msg.username} text={msg.text} datetime={msg.createdAt} />
          ))}
          <div ref={bottomRef} />
        </VStack>

        {auth.isSignedIn() && <Input placeholder="Type something ..." variant={"main"} onChange={handleInputChange} value={inputValue} onKeyDown={handleKeyDown} />}
      </VStack>
    </VStack>
  );
};

export default Chat;
