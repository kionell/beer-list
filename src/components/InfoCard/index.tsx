import { PropsWithChildren } from 'react';
import { IconComponent, InfoIcon } from '../Icon';
import './index.css';

interface InfoCardProps extends PropsWithChildren {
  className: string;
  icon?: IconComponent;
}

export const InfoCard: React.FC<InfoCardProps> = ({ className, icon, children }) => {
  return (
    <div className={['info-card__container', className].join(' ')}>
      { !icon && <InfoIcon color="#33c07e" size={30} /> }
      { icon && icon({})}
      <div className='info-card__text'>{ children }</div>
    </div>
  )
}