import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Sidebar.css";

import { PiGearLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";


const Sidebar = () => {
  const [query, setQuery] = useState('');
  const [students, setStudents] = useState([{firstName: 'John', lastName: 'Smith'}]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/teacher/students', {
      data: {
        teacherId: /*teacherId*/
      }
    })
    .then(response => {
      setStudents(response.data.students);
    })
    .catch(error => {
      setError('Failed to retrieve students');
      console.error('There was an error retrieving the students!', error);
    });
  }, [/*teacherId*/]);

  console.log(students)

  function dropdown() {
    document.getElementById(`dropdown`)?.classList.toggle("show");
    const arrow = document.getElementById('dropdown-arrow')
    if(arrow?.classList.contains('arrow-down')){
      arrow.classList.remove('arrow-down')
      arrow.classList.add('arrow-right')
    } else {
      arrow?.classList.remove('arrow-right')
      arrow?.classList.add('arrow-down')
    }
    
  }

  function dropdown_student() {
    document.getElementById(`dropdown-student`)?.classList.toggle("show");
    const arrow = document.getElementById(`student-arrow`)
    if(arrow?.classList.contains('arrow-down')){
      arrow?.classList.remove('arrow-down')
      arrow?.classList.add('arrow-right')
    } else {
      arrow?.classList.remove('arrow-right')
      arrow?.classList.add('arrow-down')
    }
  }

  function searchDropdown() {
    document.getElementById('allStudents')?.classList.toggle('show')
  }

  return (
    <div className="sidebar">
      <div className="search-bar">
        <input type="text" name="search" placeholder="Search..." id="studentSearch" onFocus={searchDropdown} /*onBlur={searchDropdown}*/ onChange={e => setQuery(e.target.value.toLowerCase())}/>
        <ul className="searchList" id="allStudents">
          {/**Allows user to search through all students regardless of which class they're in. 
           * As the user types, students that don't match the query are filtered out. Applies to first and last name*/}
          {students.filter((student) =>
            student.firstName.toLowerCase().includes(query) || student.lastName.toLowerCase().includes(query)).map((student) => (
              <Link to={`/student`} state={student}><li>{student.lastName}, {student.firstName}</li></Link>
            ))}
        </ul>
      </div>
      <Link to="/">
        <button className="sidebar-button" id="home">Home</button>
      </Link>
      <p>Class ID</p>
      <div className="class-list">
        <div className="grade-dropdown">
          <button className="dropbutton" onClick={dropdown}>
            Class Name<i className="arrow-right" id={`dropdown-arrow`}></i>
            </button>
            <div className="class-content" id={`dropdown`}>
            <button className="sidebar-button">Class Work</button>
            <div className="student-dropdown">
              <button className="dropbutton" onClick={dropdown_student}>
                Student List <i className="arrow-right" id={`student-arrow`}></i>
                </button>
                <div className="student-list" id={`dropdown-student`}>
                  {students.map((student) => (
                    <Link to={`/student`} state={student}>
                      <button className="student">
                        {student.lastName}, {student.firstName}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
              <button className="sidebar-button">Class Statistics</button>
            </div>
          </div>
      </div>
      <div>
        <Link to="/document">
          <button className="sidebar-button">Document</button>
        </Link>
      </div>
      <div className="sidebar-footer">
        <button className="sidebar-button"><div className="in-button"><PiGearLight className="icons"/> Settings</div></button>
        <button className="sidebar-button"><div className="in-button"><CiUser className="icons"/> Account Settings</div></button>
        <button className="sidebar-button"><div className="in-button"><FaArrowRight className="icons"/> Log Out</div></button>
      </div>
    </div>
  );
};

export default Sidebar;
