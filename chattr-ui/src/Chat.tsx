import {
  VStack,
  Input,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, KeyboardEvent, FunctionComponent, useEffect, useState, useRef } from "react";
import Comment from "./Comment";
import { useDebouncedCallback } from "use-debounce";
import { socket } from "./SocketContext";
import { useAuth } from "./Auth";
import { getMessages } from "./Api";
import moment from "moment";

export type MessageDto = {
  username: string;
  text: string;
  createdAt: string;
}

const Chat: FunctionComponent = () => {

  const auth = useAuth();
  const toast = useToast();

  const [msgInputValue, setMsgInputValue] = useState("");
  const [isSocketConnected, setIsSocketConnected] = useState(socket.connected);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState<MessageDto[]>([]);

  const lastCommentElRef = useRef<HTMLInputElement>(null);

  // TODO: on debounce stop showing typing indicator (another ws channel)
  const onChangeDebounced = useDebouncedCallback(() => {
    console.log("stopped typing");
  }, 500);

  const connect = () => {
    if (socket.disconnected && !isConnecting) {
      socket.connect()
      setIsConnecting(true);
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMsgInputValue(value);
    onChangeDebounced();
  };

  const handleFetchData = async () => {
    getMessages().then((messages) => {
      setMessages(messages);
    }).catch((error) => {
      console.log(error);
      toast({
        title: "Failed to fetch message history",
        status: "error",
        duration: 3000,
      })
    });
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (msgInputValue === '' || !auth.isSignedIn()) {
        return;
      }
      // 👇 Get input value
      socket.timeout(5000).emit('sendMessage', { username: auth.user?.username, text: msgInputValue });
      setMsgInputValue('');
    }
  };

  useEffect(() => {
    connect();

    function onConnect() {
      setIsSocketConnected(true);
      setIsConnecting(false);
      console.log("connected");
      handleFetchData();
    }

    function onDisconnect() {
      setIsSocketConnected(false);
      console.log("disconnected");
    }

    function onReceiveMessageEvent(payload: MessageDto) {
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


  useEffect(() => {
    lastCommentElRef.current?.scrollIntoView({ behavior: 'smooth' });
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
          {isSocketConnected && messages.length === 0 &&
            <VStack h={"100%"} justifyContent={"center"}><p>No messages yet</p></VStack>}
          {!isSocketConnected && <VStack h={"100%"} justifyContent={"center"}><Button variant={"secondary"} onClick={connect}>Reconnect</Button></VStack>}
          {messages.length > 0 && messages.map((msg) => (
            // format datetime to say "Today at 12:00"
            <Comment key={msg.createdAt} author={msg.username} text={msg.text} datetime={moment(msg.createdAt).fromNow()} />
          ))}
          <div ref={lastCommentElRef} />
        </VStack>

        {auth.isSignedIn() && <Input placeholder="Type something ..." variant={"main"} onChange={handleInputChange} value={msgInputValue} onKeyDown={handleKeyDown} />}
        {!auth.isSignedIn() && <Text color={"whiteAlpha.500"}>Sign in to start chatting</Text>}
      </VStack>
    </VStack>
  );
};

export default Chat;
