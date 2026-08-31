const terms = { A: 'All', F: 'Fall', W: 'Winter', S: 'Spring'};

export const getCourseTerm = course => (
  terms[course.term.charAt(0)]
);

export const getCourseNumber = course => (
  course.number.slice(0, 5)
);

export const TermSelector = ({term, setTerm}) => (
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

export const TermButton = ({term, setTerm, checked}) => (
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