import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { auth, db } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { Flex } from "@chakra-ui/react";
const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);
export default function Chats() {
  const [user] = useAuthState(auth);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();
  const username = user?.displayName || user.email?.split("@")[0];
  const secret = user?.uid;

  useEffect(() => {
    if (typeof document !== undefined) {
      setShowChat(true);
    }
  }, []);

  useEffect(() => {
    if (!username || !secret) {
      router.push("/");
    }
  }, [username, secret]);

  if (!showChat) return <div />;

  return (
    <Flex w="80vw" flexDir={"column"} pt={10} pl={20} pr={20} pb={10}>
      <Flex flexDir={"column"} w="55vw">
        <div className="background">
          <div className="shadow">
            <ChatEngine
              height="calc(100vh - 212px)"
              projectID="bd698cd3-eb4f-435f-be07-06b7053f01d9"
              userName={username}
              userSecret={secret}
              renderNewMessageForm={() => <MessageFormSocial />}
            />
          </div>
        </div>
      </Flex>
    </Flex>
  );
}
