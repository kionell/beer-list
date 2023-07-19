import { IconType, getIconByType } from "../../utils/icons";

interface IconProps {
  color?: string; 
  size?: number;
  className?: string;
}

const Icon: React.FC<IconProps & { type?: IconType }> = ({ 
  type, 
  size, 
  color, 
  className 
}) => {
  const Image = getIconByType(type);

  return (
    <Image 
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      className={className}
      style={{
        color,
      }}
      height={size}
      width={size}
    />
  );
}

export type IconComponent = typeof Icon;

export const DeleteIcon: React.FC<IconProps> = (props) => {
  return <Icon {...props} type={IconType.Delete}/>;
};

export const InfoIcon: React.FC<IconProps> = (props) => {
  return <Icon {...props} type={IconType.Info}/>;
};

export const HopIcon: React.FC<IconProps> = (props) => {
  return <Icon {...props} type={IconType.Hop}/>;
};

export const MaltIcon: React.FC<IconProps> = (props) => {
  return <Icon {...props} type={IconType.Malt}/>;
};

export const TemperatureIcon: React.FC<IconProps> = (props) => {
  return <Icon {...props} type={IconType.Temperature}/>;
};

export const TemperaturesIcon: React.FC<IconProps> = (props) => {
  return <Icon {...props} type={IconType.Temperatures}/>;
};
