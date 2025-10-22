import React from "react";

import { useNavigate } from "react-router-dom";



function Logout() {
        const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        navigate("/", { replace: true });
    }
    return (
        <button onClick={handleLogout} type="button" >
            Log-Out
        </button>
    )
}
export default Logout;