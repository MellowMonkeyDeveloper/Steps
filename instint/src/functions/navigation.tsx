import { SnackbarMessageProps } from "@/types/Interfaces/Snackbar"
import { snackbarAuthObject} from "@/types/Objects/Snackbar"
import { SetStateAction , Dispatch} from "react"

const handleLogout = async (setSnackbar: Dispatch<SetStateAction<boolean>>, setSnackbarDetails: Dispatch<SetStateAction<SnackbarMessageProps>>) => {
    const response = await fetch(`/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    const data = await response.json()
    if(data.ok){
        setSnackbar(true)
        setSnackbarDetails(snackbarAuthObject["Logged Out"])
    }else{
        setSnackbar(true)
        setSnackbarDetails(snackbarAuthObject["Failed Log Out"])
    }
  }

export {handleLogout}