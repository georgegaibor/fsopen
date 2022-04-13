import Part from "../components/Part";

const Content = ({parts, exercises}) => {
  return (
    <div>
      {parts.map( (part, index) => 
        {return(
          <Part name={part} exercises={exercises[index]}/>
        )}  
      )}
    </div>
  )
}

export default Content