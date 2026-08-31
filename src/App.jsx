import { useMemo } from 'react';
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { Course, Banner, CourseList } from './components/logic/CoursesList'
import {
  useQuery
} from "@tanstack/react-query";

import { apiFetch } from "./services/apifetch"
import './App.css'

import { TermSelector, TermButton, getCourseTerm, getCourseNumber} from './components/logic/TermFilter';

const URL_API = "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";

const App = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['schedule'],
    queryFn: () => apiFetch(URL_API, true)
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
