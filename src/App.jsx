import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  useQuery
} from "@tanstack/react-query";

import { apiFetch } from "./services/apifetch"
import './App.css'

const URL_API = "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";

const terms = { A: 'All', F: 'Fall', W: 'Winter', S: 'Spring'};

const getCourseTerm = course => (
  terms[course.term.charAt(0)]
);

const getCourseNumber = course => (
  course.number.slice(0, 5)
);

const TermSelector = ({term, setTerm}) => (
  <div className="btn-group">
  { 
    Object.values(terms).map(value => 
    <TermButton 
      key={value} 
      term={value} 
      setTerm={setTerm} 
      checked={value === term}
    />)
  }
  </div>
);

const TermButton = ({term, setTerm, checked}) => (
  <>
    <input 
      type="radio" 
      id={term} 
      className="btn-check" 
      autoComplete="off" 
      checked={checked} 
      onChange={() => setTerm(term)} 
    />
    
    <label className="btn btn-success m-1 p-2" htmlFor={term}>
      { term }
    </label>
  </>
);

const Course = ({ course }) => (
  <div className="card m-1 p-2">
    <div className="card-body">
      <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
      <div className="card-text">{ course.title }</div>
    </div>
  </div>
);

const Banner = props => (
  <h1>{props.title}</h1>
)

const CourseList = ({ courses }) => {

  const allList = Object.values(courses)
  const [term, setTerm] = useState('Fall');
  const termCourses = allList.filter(course => term === getCourseTerm(course));

  return (
    <>
      <TermSelector term = {term} setTerm = {setTerm}/>
      <div className="course-list">
        { term === "All" ? 
          allList.map(course => <Course key={`${course.term}-${course.number.slice(0, 5)}`} course={ course } />)
        :
          termCourses.map(course => <Course key={`${course.term}-${course.number.slice(0, 5)}`} course={ course } />) }
      </div>
    </>
  )
};

const App = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['schedule'],
    queryFn: () => apiFetch(URL_API)
  });
  
  if (error) return <h1>{error}</h1>;
  if (isLoading) return <h1>Loading the schedule...</h1>

  return (
    <div className="container">
      <Banner title={ data.title } />
      <CourseList courses={ data.courses } />
    </div>
  );
};

export default App
