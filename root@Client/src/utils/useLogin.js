import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../Store/Slice/Modal";

const useEventModal = (modalName) => {
  const modalsState = useSelector((state) => state.modals.modals);
  const dispatch = useDispatch();

  const toggle = () => {
    const isCurrentlyOpen = modalsState[modalName];
    if (isCurrentlyOpen) {
      // If the modal is currently open, close it
      dispatch(toggleModal(modalName));
    } else {
      // If the modal is closed, open it and close the other modal
      Object.keys(modalsState).forEach((modal) => {
        if (modal !== modalName && modalsState[modal]) {
          dispatch(toggleModal(modal));
        }
      });
      dispatch(toggleModal(modalName));
    }
  };

  return { isOpen: modalsState[modalName], toggle };
};

export default useEventModal;
