import './index.css';

interface ContributorProps {
  contributor: string;
}

export const Contributor: React.FC<ContributorProps> = ({ contributor }) => {
  return (
    <div className='contributor__container'>
      <span>by </span>
      <span>{contributor}</span>
    </div>
  );
}
