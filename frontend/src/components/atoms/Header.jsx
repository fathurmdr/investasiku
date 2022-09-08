function Header(props) {
  const { title } = props;
  return (
    <header className="header">
      <h1>{title}</h1>
    </header>
  );
}

export default Header;
