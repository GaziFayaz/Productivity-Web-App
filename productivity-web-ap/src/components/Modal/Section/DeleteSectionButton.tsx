import { db } from "@/firebase/clientApp";
import { Icon, Text } from "@chakra-ui/react";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const DeleteSectionButton = (section: any) => {
  const router = useRouter();

  const deleteTask = async () => {
       console.log(section)
    section.section.tasks.map(async (task: any) => {
        await deleteDoc(doc(db, "tasks", task));
    });
    await deleteDoc(doc(db, "sections", section.sectionId)).then( async() => {
        const projectRef = doc(db, "projects", section.projectId)
        await updateDoc(projectRef, {
        sections: arrayRemove(section.sectionId),
      })
    })
    router.reload();
  };
  return (
    <Text
      color={"red"}
      width={"full"}
      cursor="pointer"
      onClick={deleteTask}
    >Delete</Text>
  );
};

export default DeleteSectionButton;
