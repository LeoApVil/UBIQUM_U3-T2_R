import { useState } from 'react'

import { TermSelector, TermButton, getCourseTerm, getCourseNumber} from './TermFilter';

import { courseConflict, hasConflict, toggle } from '../logic/ScheduleProcess';


export const Course = ({ course, selected, setSelected }) => {

  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  const style = {
    backgroundColor: isDisabled? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
  };
  
  return (
  <div className="card m-1 p-2" style = {style} onClick={isDisabled ? null : () =>  setSelected(toggle(course, selected))}>
    <div className="card-body">
      <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
      <div className="card-text">{ course.title }</div>
      <div className="card-text">{ course.meets }</div>
    </div>
  </div>)
};

export const Banner = props => (
  <h1>{props.title}</h1>
)

export const CourseList = ({ courses }) => {

  const allList = Object.values(courses);
  const [selected, setSelected] = useState([]);
  
  const [term, setTerm] = useState('Fall');
  const termCourses = allList.filter(course => term === getCourseTerm(course));

  return (
    <>
      <TermSelector term = {term} setTerm = {setTerm}/>
      <div className="course-list">
        { term === "All" ? 
          allList.map(course => <Course key={`${course.term}-${course.number.slice(0, 5)}`} course={ course } 
          selected={selected} setSelected={ setSelected }
        />)
        :
          termCourses.map(course => <Course key={`${course.term}-${course.number.slice(0, 5)}`} course={ course } 
          selected={selected} setSelected={ setSelected }
        />) }
      </div>
    </>
  )
};