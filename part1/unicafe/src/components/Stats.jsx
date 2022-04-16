import StatLine from "../components/StatLine";
import "./stats.css";

const Stats = ({names, counts}) => {
  
  const getTotal = ()=>{
    return counts.reduce((partial, a)=>partial+a,0)
  }
  
  const average = ()=>{
    const score = (counts[0] - counts[2])/getTotal()
    return  score
  }

  const percentPositive = () => {
    return (counts[0]/getTotal())*100
  }

  if(getTotal()==0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          {names.map((name, index)=>{
            return(
              <tr key={index}>
                <td><StatLine text={name} number={counts[index]}/></td>
              </tr>
            )
          })}
          <tr>
            <td><StatLine text="All" number={getTotal()}/></td>
          </tr>
          <tr>
            <td><StatLine text="Average" number={average()}/></td>
          </tr>
          <tr>
            <td><StatLine text="Positive" number={percentPositive()}/></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Stats