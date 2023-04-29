import { StarIcon } from "@chakra-ui/icons";
import {
  Card,
  HStack,
  Stack,
  CardBody,
  Heading,
  Image,
  Text,
  Spacer,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface CommentProps {
  author: string;
  text: string;
}

const Comment: FunctionComponent<CommentProps> = (props: CommentProps) => {
  return (
    <Card w={"100%"} bg={"none"} variant={"unstyled"} pb={"0.5rem"}>
      <HStack alignItems={"flex-start"} spacing={"1rem"}>
        <Image
          objectFit="cover"
          w={"3rem"}
          h={"3rem"}
          borderRadius={"3rem"}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="User"
        />
        <Stack>
          <CardBody>
            <HStack>
            <Heading size="sm" color={"whiteAlpha.900"}>
              {props.author}
            </Heading>
            <Text fontSize={"xs"} color={"whiteAlpha.700"}>
              Today at 7:01 PM
            </Text>
            </HStack>
            <Text py="0.5rem" color={"whiteAlpha.800"}>
              {props.text}
              This is such an amazing chat that I can't even put it into words.
              Great job team. We did it! But I have to add some more text else
              it won't wrap and I won't see how this thing look so. There you
              go.
            </Text>
          </CardBody>
        </Stack>
      </HStack>
      <Divider color={"whiteAlpha.100"} mt={"0.5rem"}/>
    </Card>
  );
};

export default Comment;
