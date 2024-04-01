"use client";
import Navigation from "@/components/navigation/Navigation";
import ModalBase from "../../components/modal/ModalBase";
import { useWrapper } from "@/context/WrapperProvider";
import Menu from "../Menu/Menu";
export default function LayouNav() {
  const { deleteModal, setDeleteModal, setDeleteItem, showMenu } = useWrapper();
  return (
    <>
      <Navigation />
      {deleteModal && (
        <ModalBase
          confirm={setDeleteItem}
          close={setDeleteModal}
          header="Warning"
          details="Are you sure you want to delete this entry?"
        />
      )}
      {showMenu && (
        <Menu />
      )}
    </>
  );
}
