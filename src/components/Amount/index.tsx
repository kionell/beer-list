import { UnitValue } from "../../interfaces/UnitValue"
import './index.css';

interface AmountProps {
  className: string;
  name: string;
  amount: UnitValue;
}

export const Amount: React.FC<AmountProps> = ({ 
  className, 
  name, 
  amount 
}) => {
  return (
    <div className={['amount', className].join(' ')}>
      <h4 className='amount__name'>{name}</h4>
      <span className='amount__value'>
        {`${amount.value} ${amount.unit}`}
      </span>
    </div>
  )
};
