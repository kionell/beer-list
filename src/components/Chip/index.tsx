import './index.css';

export interface ChipProps {
  color?: string;
  title: string;
  content: string | number;
}

export const Chip: React.FC<ChipProps> = ({
  color,
  title,
  content,
}) => {
  return (
    <div className='chip__container' style={{ color }}>
      <span className='chip__title'>{title}: </span>
      <span className='chip__content'>{content}</span>
    </div>
  );
}
