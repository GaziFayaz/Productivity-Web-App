import { db } from "@/firebase/clientApp";
import { Icon, Text } from "@chakra-ui/react";
import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const DeleteProjectButton = (project:any) => {
  const router = useRouter();

  const deleteTask = async () => {
    console.log(project);
    project.project.sections.map(async (section:any) => {
      console.log(section);
      const secSnap = await getDoc(doc(db, "sections", section));
      if(secSnap.exists()){
        secSnap.data().tasks.map(async (task: any) => {
        console.log("Deleting task", task)
        await deleteDoc(doc(db, "tasks", task));
      });
      console.log("deleting section: ", section)
      await deleteDoc(doc(db, "sections", section));
      }
    });
    console.log("deleting project: ", project.projectId)
    await deleteDoc(doc(db, "projects", project.projectId)).then(async() => {
        const userRef = doc(db, "users", project.userId)
        await updateDoc(userRef, {
            projects: arrayRemove(project.projectId)
        })
    });
    router.reload()
  };
  return (
    <Text color={"red"} width={"full"} cursor="pointer" onClick={deleteTask}>
      Delete
    </Text>
  );
};

export default DeleteProjectButton;
