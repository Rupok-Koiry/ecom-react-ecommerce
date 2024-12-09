type SectionTitle = {
  title: string;
  description?: string;
  className?: string;
};

const SectionTitle = ({ title, description, className }: SectionTitle) => {
  const defaultClassName = `max-w-[720px] mx-auto text-center md:mb-12 mb-8`;
  const sectionClassName = `${defaultClassName} ${className}`;
  return (
    <div className={`${sectionClassName}`}>
      <h3 className="text-3xl md:text-4xl xl:text-5xl text-primary-text font-bold mb-4 md:mb-6 capitalize font-playwrite">
        {title}
      </h3>
      {description && <p className="mb-5 text-secondary-text">{description}</p>}
    </div>
  );
};

export default SectionTitle;
