
const Total = ({exercises}) => {
  return (
    <div>
      <p>
        Total: {exercises.reduce((partial, a)=>
          partial + a, 0
        )}
      </p>
    </div>
  )
}

export default Total