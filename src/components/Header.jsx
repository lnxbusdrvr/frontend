const Header = ({app}) => {
  const headerStyle = {
    color: 'green',
    fontStyle: 'italic'
  }
  return (
    <h1 style={headerStyle}>{app}</h1>
  )
}

export default Header
