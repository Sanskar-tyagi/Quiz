import { useDispatch } from "react-redux";
import { setUser } from "../Store/Slice/Userslice"; 
export default function useSetUser(user) {
 const dispatch=useDispatch()
    dispatch(setUser(user));         
}
