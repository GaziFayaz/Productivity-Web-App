import { db } from "@/firebase/clientApp";
import { Icon } from "@chakra-ui/react";
import { arrayRemove, deleteDoc, doc,updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const DeleteTaskButton = (task) => {
  const router = useRouter();

  const deleteTask = async () => {
    //    console.log(task)
    await deleteDoc(doc(db, "tasks", task.taskId)).then(async() => {
      const secRef = doc(db, "sections", task.sectionId);
      console.log("secRef: ", secRef)
      await updateDoc(secRef, {
        tasks: arrayRemove(task.taskId),
      }).then(() => {
        router.reload();
      });
    });
  };
  return (
    <Icon
      as={AiOutlineDelete}
      fontSize="18"
      color={"gray.500"}
      cursor="pointer"
      onClick={deleteTask}
    />
  );
};

export default DeleteTaskButton;

