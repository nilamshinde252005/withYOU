import React from "react";
import "../styles/ListJournal.css";
import { NavLink } from 'react-router-dom';

function List({ month, year, day, date, title, icon, type }) {
    const targetLink =
        type === "heavy"
            ? "/NewPageJournalHeavy"
            : type === "light"
                ? "/NewPageJournalLight"
                : "/NewPageJournal";

    return (
        <div>
            <h1 style={{ display: 'flex', gap: '0.5rem' }}>
                <span>{month}</span>
                <span>{year}</span>

                <NavLink to={targetLink}>
                    <img
                        src="/icons/newpage.png" 
                        alt="Open Journal"
                        style={{
                            width: "170px",
                            height: "150px",
                            paddingLeft: "1rem",
                            marginTop: "-10px",
                        }}
                    />
                </NavLink>



            </h1>
            <div className="list-container">
                <div className="list-item" style={{ display: 'flex', gap: '0.5rem' }}>
                    <span>{day}</span>
                    <span>{date}</span>
                </div>                <span className="list-item">{title}</span>
                {icon && <img src={icon} className="list-icon" alt="icon" />}
            </div>
        </div>
    )
}
export default List;