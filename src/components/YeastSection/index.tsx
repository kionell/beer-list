import './index.css';

interface YeastSectionProps {
  yeast: string;
}

export const YeastSection: React.FC<YeastSectionProps> = ({ yeast }) => {
  return (
    <section className='yeast__section ingredients__section'>
      <h3 className='yeast__title'>Yeast</h3>
      <p className='yeast__content'>{yeast}</p>
    </section>
  );
}
