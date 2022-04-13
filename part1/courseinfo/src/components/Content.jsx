import Part from "../components/Part";

const Content = ({parts}) => {
  return (
    <div>
      {parts.map( (part, index) => 
        {return(
          <Part key={index} name={part.name} exercises={part.exercise}/>
        )}  
      )}
    </div>
  )
}

export default Content