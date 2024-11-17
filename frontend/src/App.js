
import { CSidebar, CSidebarHeader, CSidebarBrand, CSidebarNav, CNavTitle, CNavItem, CContainer, CNavGroup } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilArrowLeft, cilArrowRight } from '@coreui/icons';
import In from './components/in';
import Out from './components/out';
import { useState } from 'react';
import Stores from './components/stores';
import Partions from './components/partions';

function App() {

  const [showTap, setShowTap] = useState('in')

 
  return (
    <div style={{ height: "100vh", display: "flex" }}>

      <CSidebar className="border-end">
        <CSidebarHeader className="border-bottom">
          <CSidebarBrand>NPF</CSidebarBrand>
        </CSidebarHeader>
        <CSidebarNav>
          <CNavTitle>Input Output</CNavTitle>
          <CNavItem href="#"  onClick={()=> setShowTap('in')} className={showTap == "in" && 'active'}><CIcon customClassName="nav-icon" icon={cilArrowRight}/> IN</CNavItem>
          <CNavItem href="#" onClick={()=> setShowTap('out')} className={showTap == "out" && 'active'}><CIcon customClassName="nav-icon" icon={cilArrowLeft}  /> OUT </CNavItem>
          <CNavItem href="#" onClick={()=> setShowTap('stores')} className={showTap == "stores" && 'active'}><CIcon customClassName="nav-icon" icon={cilArrowLeft}  /> Stores </CNavItem>
          <CNavItem href="#" onClick={()=> setShowTap('partions')} className={showTap == "partions" && 'active'}><CIcon customClassName="nav-icon" icon={cilArrowLeft}  /> Partions </CNavItem>

        </CSidebarNav>
      </CSidebar>
      <CContainer>
        {showTap == "in" &&
          <In />
        }
        {showTap == "out" &&
          <Out />
        }
        {showTap == "stores" &&
         <Stores />
        }
        {showTap == "partions" &&
         <Partions />
        }

      </CContainer>
    </div>
  );
}

export default App;
