// Librerías externas
// import { useMemo } from 'react';
import { useQuery } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Assets
import heroImg from './assets/hero.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';

// Componentes locales
import { Course, Banner, CourseList } from './components/logic/CoursesList';
import { TermSelector, TermButton, getCourseTerm, getCourseNumber } from './components/logic/TermFilter';
import { EditForm } from './components/EditForm';

// Servicios y utilidades
// import { apiFetch } from "./services/apifetch";
import { addScheduleTimes } from './components/logic/ScheduleProcess';
import { useData } from './utilities/firebase';

// Estilos
import './App.css';

const URL_API = "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";

const App = () => {
  
  const [schedule, loading, error, isLoading] = useData('/', addScheduleTimes);
  
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ['schedule'],
  //   queryFn: () => apiFetch(URL_API, true)
  // });
  
  if (error) return <h1>{error}</h1>;
  if (isLoading) return <h1>Loading the schedule...</h1>

  if (!schedule) return <h1>No se encontraron datos en la base de datos.</h1>;

  return (
    <div className="container">
      <Banner title={ schedule.title } />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CourseList courses={ schedule.courses } />} />
          <Route path="/edit" element={ <EditForm /> } />
        </Routes>
      </BrowserRouter>


      {/* <CourseList courses={ schedule.courses } /> */}
    </div>
  );
};

export default App;