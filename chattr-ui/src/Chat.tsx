import { CopyIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  Heading,
  Spacer,
  Code,
  Tooltip,
  IconButton,
  VStack,
  Input,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import Comment from "./Comment";

interface ChatProps {
  comments: any;
}

const Chat: FunctionComponent<ChatProps> = (props: ChatProps) => {
  return (
    <VStack w={"100%"}>
      <HStack w={"100%"} alignContent={"center"} p={"0.5rem 1rem"}>
        <Heading size={"lg"}>Epic Chat</Heading>
        <Spacer />
        <HStack>
          <Code
            variant={"solid"}
            bg={"whiteAlpha.100"}
            fontSize={"md"}
            color={"gray.300"}
          >
            FJARxzLKt0NCqTrk3uj1tXTVMadTl+dwCSCmvBmRvDw=
          </Code>
          <Tooltip label={"Copy chat ID"}>
            <IconButton
              icon={<CopyIcon />}
              aria-label={"Copy"}
              variant={"link"}
              size={"lg"}
            />
          </Tooltip>
        </HStack>
      </HStack>
      <VStack
        mt={"1rem"}
        p={"1rem"}
        border={"1px"}
        borderRadius={"1rem"}
        borderColor={"whiteAlpha.100"}
      >
        <VStack h={"62vh"} w={"100%"} overflow={"scroll"}>
          {props.comments.map((comment) => (
            <Comment author={comment.author} text={comment.text} />
          ))}
        </VStack>
        <Input placeholder="Type something ..." variant={"main"} />
      </VStack>
    </VStack>
  );
};

export default Chat;
