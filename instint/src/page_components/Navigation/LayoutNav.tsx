"use client";
import Navigation from "@/components/navigation/Navigation";
import { useWrapper } from "@/context/WrapperProvider";
import Menu from "../Menu/Menu";
import Snackbar from "@/components/snackbar/Snackbar";
export default function LayouNav() {
  const {
    snackbar,
    deleteModal,
    setDeleteModal,
    setDeleteItem,
    showMenu,
    setShowMenu,
  } = useWrapper();
  return (
    <>
      <Navigation />
     
      {showMenu && <Menu setShowModal={setShowMenu} />}
      {snackbar && <Snackbar />}
    </>
  );
}
