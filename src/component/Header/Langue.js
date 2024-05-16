import { useTranslation } from 'react-i18next';

import NavDropdown from 'react-bootstrap/NavDropdown';

const Language = (props) => {
  const {t,i18n}=useTranslation();
  const handeChangeLanguage=(language)=>{
    i18n.changeLanguage(language)
  }
    return (
        <>
        
         <NavDropdown title={i18n.language==='vi'?"Việt Nam":'English'} id="basic-nav-dropdown" className='languages'>
            <NavDropdown.Item onClick={()=>handeChangeLanguage('en')}>English</NavDropdown.Item>
            <NavDropdown.Item onClick={()=>handeChangeLanguage('vi')} >Việt Nam</NavDropdown.Item>
          </NavDropdown>
        </>
    )
}
export default Language;