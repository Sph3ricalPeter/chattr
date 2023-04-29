import {
  AddIcon,
  ArrowForwardIcon,
  ArrowRightIcon,
  CopyIcon,
  PlusSquareIcon,
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  IconButton,
  Code,
  Tooltip,
  Input,
  Spacer,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from "@chakra-ui/react";
import Comment from "./Comment";
import { AiFillGithub, AiOutlineRedEnvelope } from "react-icons/ai";
import Chat from "./Chat";

function App() {
  const comments = [
    {
      author: "Bob Ross",
      text: "This is such an amazing chat that I can't even put it into words. Great job team. We did it! But I have to add some more text else it won't wrap and I won't see how this thing look so. There you go.",
    },
    {
      author: "Bob Ross",
      text: "This is such an amazing chat that I can't even put it into words. Great job team. We did it! But I have to add some more text else it won't wrap and I won't see how this thing look so. There you go.",
    },
    {
      author: "Bob Ross",
      text: "This is such an amazing chat that I can't even put it into words. Great job team. We did it! But I have to add some more text else it won't wrap and I won't see how this thing look so. There you go.",
    },
    {
      author: "Bob Ross",
      text: "This is such an amazing chat that I can't even put it into words. Great job team. We did it! But I have to add some more text else it won't wrap and I won't see how this thing look so. There you go.",
    },
  ];

  return (
    <Flex w={"100%"} h={"100vh"} justifyContent={"center"}>
      <VStack
        h={"100vh"}
        w={"1000px"}
        justifyContent={"flex-start"}
        p={"2rem 0"}
        spacing={"4rem"}
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
          <HStack w={"100%"} justifyContent={"flex-end"}>
            <HStack spacing={"1rem"} fontWeight={"bold"} m={"0 1rem"}>
              <Link href="#" color="white">
                about
              </Link>
              <Link href="#" color="white">
                repo
              </Link>
            </HStack>
            <Button variant="secondary">Sign Up</Button>
            <Button variant="primary" rightIcon={<ArrowForwardIcon />}>
              Sign In
            </Button>
          </HStack>
        </HStack>
        <Tabs
          w={"inherit"}
          variant="solid-rounded"
          colorScheme="pink"
          size={"sm"}
        >
          <TabList>
            <Tab>Epic Chat</Tab>
            <Tab>Boring stuff</Tab>
            <IconButton
              icon={<AddIcon />}
              aria-label={""}
              variant={"primary"}
              ml={"1rem"}
            />
          </TabList>
          <TabPanels p={"0.5rem"} mt={"0.5rem"}>
            <TabPanel p={0}>
              <Chat comments={comments} />
            </TabPanel>
            <TabPanel p={0}>
              <Chat comments={comments.slice(0, 1)} />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <HStack w={"100%"} pb={"2rem"} justifyContent={"center"}>
          <Text>
            Made by{" "}
            <Link href="https://github.com/Sph3ricalPeter">
              Peter J. <Icon as={AiFillGithub} boxSize={"1rem"} />
            </Link>
          </Text>
        </HStack>
      </VStack>
    </Flex>
  );
}

export default App;
