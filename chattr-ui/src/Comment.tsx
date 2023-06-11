import {
  Card,
  HStack,
  Stack,
  CardBody,
  Heading,
  Image,
  Text,
  Divider,
  Avatar,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface CommentProps {
  author: string;
  text: string;
  datetime: string;
}

const Comment: FunctionComponent<CommentProps> = (props: CommentProps) => {
  return (
    <Card w={"100%"} bg={"none"} variant={"unstyled"} pb={"0.5rem"}>
      <HStack alignItems={"flex-start"} spacing={"1rem"}>
        <Avatar size={"sm"} name={props.author.slice(0, 1) + " " + props.author.slice(1)}></Avatar>
        <Stack>
          <CardBody>
            <HStack>
            <Heading size="sm" color={"whiteAlpha.900"}>
              {props.author}
            </Heading>
            <Text fontSize={"xs"} color={"whiteAlpha.700"}>
              {/* Today at 7:01 PM */}
              {props.datetime}
            </Text>
            </HStack>
            <Text py="0.5rem" color={"whiteAlpha.800"}>
              {props.text}
              {/* This is such an amazing chat that I can't even put it into words.
              Great job team. We did it! But I have to add some more text else
              it won't wrap and I won't see how this thing look so. There you
              go. */}
            </Text>
          </CardBody>
        </Stack>
      </HStack>
      <Divider color={"whiteAlpha.100"} mt={"0.5rem"}/>
    </Card>
  );
};

export default Comment;
