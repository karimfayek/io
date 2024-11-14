
import { CSidebar, CSidebarHeader, CSidebarBrand, CSidebarNav, CNavTitle, CNavItem, CContainer, CNavGroup } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilArrowLeft, cilArrowRight } from '@coreui/icons';
import In from './components/in';
import Out from './components/out';
import { useState } from 'react';

function App() {

  const [showIn, setShowIn] = useState(true)
  const [showOut, setShowOut] = useState(false)

  const showTap = (tap) => {
    if (tap == "in") {
      setShowIn(true)
      setShowOut(false)
    }
    else {
      setShowIn(false)
      setShowOut(true)
    }
  }
  return (
    <div style={{ height: "100vh", display: "flex" }}>

      <CSidebar className="border-end">
        <CSidebarHeader className="border-bottom">
          <CSidebarBrand>NPF</CSidebarBrand>
        </CSidebarHeader>
        <CSidebarNav>
          <CNavTitle>Input Output</CNavTitle>
          <CNavItem href="#"  onClick={()=> showTap('in')} className={showIn && 'active'}><CIcon customClassName="nav-icon" icon={cilArrowRight}/> IN</CNavItem>
          <CNavItem href="#" onClick={()=> showTap('out')} className={showOut && 'active'}><CIcon customClassName="nav-icon" icon={cilArrowLeft}  /> OUT </CNavItem>

        </CSidebarNav>
      </CSidebar>
      <CContainer>
        {showIn &&
          <In />
        }
        {showOut &&
          <Out />
        }

      </CContainer>
    </div>
  );
}

export default App;
