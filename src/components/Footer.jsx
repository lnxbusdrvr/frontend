const Footer = ({app, school, year}) => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <p style={footerStyle}>{app}, {school}, {year}.</p>
  )
}

export default Footer;
