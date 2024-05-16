import NavDropdown from 'react-bootstrap/NavDropdown';

const Language = (props) => {
    return (
        <>
        
         <NavDropdown title="Việt Nam" id="basic-nav-dropdown" className='languages'>
            <NavDropdown.Item >Enghlist</NavDropdown.Item>
            <NavDropdown.Item >Việt Nam</NavDropdown.Item>
          </NavDropdown>
        </>
    )
}
export default Language;