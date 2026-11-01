type HeaderProps = {
  name: string;
};

const Header = ({ name }: HeaderProps) => {
  return (
    <header className="hero animate-rise md:col-span-4">
      <span aria-hidden className="glow" />
      <span className="chip-glass relative">Course overview</span>
      <h1 className="relative">{name}</h1>
    </header>
  );
};

export default Header;