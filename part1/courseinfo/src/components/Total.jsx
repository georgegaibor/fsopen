
const Total = ({parts}) => {
  return (
    <div>
      <p>
        Total:  {
          parts
          .map((part)=>part.exercise)
          .reduce((partial,a)=>
          partial+a, 0)
        }
      </p>
    </div>
  )
}

export default Total

