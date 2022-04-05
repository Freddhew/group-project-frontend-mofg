import React from "react";
import { get, post, put, remove } from "../utility/fetchUtility";
import { slideUp, slideDown } from "../utility/slideFunctions";
import { useState, useEffect } from "react";
import "./css/courses.css";

function Courses() {
  const [id, setId] = useState("");
  const [counter, setCounter] = useState(Date.now());
  const [teacher, setTeacher] = useState([]);
  const [chooseTeacher, setChooseTeacher] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseLength, setCourseLength] = useState("");
  const [course, setCourse] = useState([]);

  useEffect(() => {
    get("/Courses").then((response) => setCourse(response.data));
    get("/Staff").then((response) => setTeacher(response.data));
    console.log(`Course: ${course}`);
    scrollToSection();
    hideSettings(0);
    setTimeout(() => { hideSettings(0); }, 250);
  }, []);

  let isDisplayingSettings = false;

  function scrollToSection(){
    const viewPort = document.getElementById("course-main");
    viewPort.scrollIntoView({behavior: 'smooth'});
  }
  
  function hideSettings(time){
    let courseSettings = document.getElementsByClassName("course-settings")
    for (var i = 0; i < courseSettings.length; i++) {
      console.log(courseSettings.item(i));
      slideUp(courseSettings.item(i), time);
    }
  }

  function showSettings(time){
    let courseSettings = document.getElementsByClassName("course-settings")
    for (var i = 0; i < courseSettings.length; i++) {
      console.log(courseSettings.item(i));
      slideDown(courseSettings.item(i), time);
    }
  }

  function displaySettings(){
    if (isDisplayingSettings === false){
      showSettings(200);
      isDisplayingSettings = true;
    } else {
      hideSettings(200);
      isDisplayingSettings = false;
    }
  }


  return (
    <div id="course-main" className="courses-bg">

      {/* Course List */}
      {/* Course List */}
      {/* Course List */}
      {/* Course List */}
      <div className="course-object-list">
              <h2 className="course-h2">Available Courses</h2>
              <ul>
                {course.map((courses) => {
                  return (
                    <div className="course-object">
                      <li key={courses.courseId}>
                        
                        <h3>COURSE &nbsp; {courses.courseName}</h3>
                        <br/>
                        <h3 className="course-h3">Description</h3>
                        <p>{courses.courseDescription}</p>
                        <br/>
                        <h4>Teacher</h4>
                        <h3 className="course-h3 course-teacher-highligt">{courses.teacher}</h3>
                        <br/>
                        <p>Duration {parseInt(courses.courseLength)} weeks</p>
                        

                        <p>
                        <br/>
                        <button className="course-remove-by-id-btn course-settings" 
                                onClick={() => {
                            remove(`/Courses/${courses.courseId}`);
                            get("/Courses").then((response) => setCourse(response.data));
                        }}>Remove Course with ID: {courses.courseId}</button></p>
                      </li>
                    </div>
                  );
                })}
              </ul>
      </div>

      <div className="display-settings-btn-div">
        <button className="display-settings-btn" onClick={() => {
          displaySettings();
        }}>
        Edit Courses
        </button>
      </div>

      {/* Course Settings */}
      {/* Course Settings */}
      {/* Course Settings */}
      {/* Course Settings */}
      <div className="course-object-settings course-settings">
        <ul>
          <li className="course-settings-header">  
            Course Settings
          </li>
          <li>
            <input    className='course-input' 
                      value={courseName} 
                      placeholder="Course Name" 
                      onChange={(e) => setCourseName(e.target.value)}></input>
          </li>
          <li>
            <select className='course-input' 
                      value={chooseTeacher} 
                      onChange={(event) => setChooseTeacher(event.target.value)}>
              <option value="" 
                      selected hidden>Select Teacher</option>
              {teacher.map((teachers) => {
                if (teachers.profession === "teacher") {
                  return (
                    <option key={teachers.id}>
                      {`${teachers.firstName} ${teachers.lastName}  `}
                    </option>
                  );
                }
              })}
            </select>
          </li>
          <li>
            <input className="course-input course-description-height" value={courseDescription} placeholder="Course Description" onChange={(e) => setCourseDescription(e.target.value)}></input>
          </li>
          <li>
            <input className="course-input" value={courseLength} placeholder="Course Duration (Weeks)" onChange={(e) => setCourseLength(e.target.value)}></input>
          </li>
          <li>
            <button className="course-add-new-course-btn"
                    onClick={() => {
                      post("/Courses", {
                        id: counter,
                        courseName: courseName,
                        teacher: chooseTeacher,
                        courseLength: courseLength,
                        courseDescription: courseDescription,
                      });
                      setCounter(Date.now());
                      get("/Courses").then((response) => setCourse(response.data));
              }}>Create New Course</button>
            <button className="course-add-new-course-btn"
                    onClick={() => {
                put(`/Courses/${id}`, {
                    id: id,
                    courseName: courseName,
                    teacher: chooseTeacher,
                    courseLength: courseLength,
                    courseDescription: courseDescription,
                }).then((response) => console.log(response));
                get("/Courses").then((response) => setCourse(response.data));
              }}>Update</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Courses;
