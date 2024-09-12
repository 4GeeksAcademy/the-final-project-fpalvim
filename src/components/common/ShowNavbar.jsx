import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ShowNavbar({children}) {
    
    const location = useLocation()

    const [toShowNavbar, setToShowNavbar] = useState(false)
    
    useEffect(()=>{
        console.log(location);
        if (location.pathname == '/loginpage') {
            setToShowNavbar(false)
        } if (location.pathname == '/') {
            setToShowNavbar(false)
        } else {
            setToShowNavbar(true)
        }
    },[location])

    return ( 
        <div>{toShowNavbar && children}</div>
     );
}

export default ShowNavbar;