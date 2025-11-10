
import { useSelector } from 'react-redux';
import { TogglePlan } from './TogglePlan';

export const CambiarPlan = () => {
    const plan = useSelector(state => state.user.plan);

  return (
    <div style={{display:"flex", flexDirection:"column"}}>
        <h1>Planes: </h1>
        <h2>Cambiar de plan  <TogglePlan /></h2>
        <p>Estado actual: {plan}</p>
        <br />
    </div>
  )
}
