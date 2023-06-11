import {
  ArrowForwardIcon,
} from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  Heading,
  VStack,
  Text,
  Link,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  UseDisclosureProps,
  Toast,
  useToast,
  Avatar,
  Tooltip,
} from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import Chat from "./Chat";
import { SocketProvider } from "./SocketContext";
import { AuthProvider, useAuth } from "./Auth";
import { FunctionComponent, useEffect } from "react";
import { signIn, signUp } from "./Api";
import { generateUniqueColor } from "./Colors";

enum ModalType {
  LOGIN,
  SIGNUP
}

interface SignupModalProps {
  title: string;
  type: ModalType;
  disclosure: UseDisclosureProps;
}

const SignupModal: FunctionComponent<SignupModalProps> = (props) => {
  const auth = useAuth();
  const toast = useToast();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(event.target[0].value, event.target[1].value);
    if (props.type === ModalType.LOGIN) {
      signIn({
        username: event.target[0].value,
        password: event.target[1].value
      }).then((data) => {
        auth.signIn({
          id: data.userId,
          username: event.target[0].value,
          accessToken: data.access_token,
        });
        toast({
          title: "Login successfull",
          status: "success",
          duration: 3000,
        })
        props.disclosure.onClose?.();
      }).catch((err) => {
        console.log(err);
        toast({
          title: "Invalid username or password",
          status: "error",
          duration: 3000,
        })
      });
    } else {
      signUp({
        username: event.target[0].value,
        password: event.target[1].value
      }).then(() => {
        toast({
          title: "Signup successfull",
          status: "success",
          duration: 3000,
        })
        props.disclosure.onClose?.();
      }).catch((err) => {
        console.log(err);
        toast({
          title: "Account already exists",
          status: "error",
          duration: 3000,
        })
      });
    }
  }

  return (
    <Modal isOpen={props.disclosure.isOpen!} onClose={props.disclosure.onClose!}>
      <ModalOverlay />
      <ModalContent bg={"#222"}>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit} >
          <ModalBody>
            <VStack spacing={"1rem"}>
              <Input type="username" placeholder="username" variant={"main"} autoFocus />
              <Input type="password" placeholder="password" variant={"main"} />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant={"primary"} type={"submit"}>
              {props.title}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

const App = () => {
  const auth = useAuth();

  const signUpDisclosure = useDisclosure();
  const signInDisclosure = useDisclosure();

  return (
    <Flex w={"100%"} h={"100vh"} justifyContent={"center"}>
      <VStack
        h={"100vh"}
        w={"96%"}
        maxW={"1000px"}
        justifyContent={"flex-start"}
        p={"2rem 0"}
        spacing={"1rem"}
      >
        <HStack w={"100%"} h={"5rem"} justifyContent={"flex-start"}>
          <HStack>
            <Heading
              color={"pink.500"}
              fontWeight={"black"}
              fontStyle={"italic"}
            >
              &gt;_
            </Heading>
            <Heading size="2xl">Chattr</Heading>
          </HStack>
          <HStack w={"100%"} justifyContent={"flex-end"} spacing={"1rem"}>
            <HStack spacing={"1rem"} fontWeight={"bold"} m={"0 1rem"}>
              <Link href="https://github.com/Sph3ricalPeter/chattr" target="blank" color="white">
                <HStack spacing={"0.3rem"}>
                  <Text>repo</Text>
                  <Icon as={AiFillGithub} />
                </HStack>
              </Link>
            </HStack>
            <HStack spacing={"1rem"}>
              {auth.isSignedIn() &&
                <Tooltip hasArrow bg={"black"} label={auth.user?.username}>
                  <Avatar size={"sm"} name={auth.user?.username.slice(0, 1) + " " + auth.user?.username.slice(1)} />
                </Tooltip>}
              {!auth.isSignedIn() && <Button variant="secondary" onClick={signUpDisclosure.onOpen}>Sign Up</Button>}
              {!auth.isSignedIn() && <Button variant="primary" onClick={signInDisclosure.onOpen} rightIcon={<ArrowForwardIcon />}>
                Sign In
              </Button>}
              {auth.isSignedIn() &&
                <Button variant="secondary" onClick={auth.signOut}>Sign Out</Button>}
            </HStack>
          </HStack>
        </HStack>
        <Flex w={"100%"}>
          <SignupModal title={"Sign Up"} type={ModalType.SIGNUP} disclosure={signUpDisclosure} />
          <SignupModal title={"Sign In"} type={ModalType.LOGIN} disclosure={signInDisclosure} />
          <SocketProvider>
            <Chat />
          </SocketProvider>
        </Flex>
        <HStack w={"100%"} p={"1rem 0"} justifyContent={"center"}>
          <Text>Made by{" "}</Text>
          <Link href="https://github.com/Sph3ricalPeter" target="blank">
            <HStack spacing={"0.3rem"}>
              <Text>Peter J.</Text>,
              <Icon as={AiFillGithub} />
            </HStack>
          </Link>
        </HStack>
      </VStack>
    </Flex>
  );
}

export default App;
