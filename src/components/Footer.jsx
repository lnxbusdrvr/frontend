const Footer = ({app, school, year}) => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>{app}, {school}, {year}.</div>
  )
}

export default Footer;
