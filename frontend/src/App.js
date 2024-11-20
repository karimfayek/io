
import { CSidebar, CSidebarHeader, CSidebarBrand, CSidebarNav, CNavTitle, CNavItem, CContainer, CNavGroup } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilArrowLeft, cilArrowRight } from '@coreui/icons';
import In from './components/in';
import Out from './components/out';
import { useState } from 'react';
import Stores from './components/stores';
import Partions from './components/partions';
import Shelves from './components/shelfs';
import Boxes from './components/boxes';

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
          <CNavItem href="#" onClick={()=> setShowTap('boxes')} className={showTap == "boxes" && 'active'}><CIcon customClassName="nav-icon" icon={cilArrowLeft}  /> IN </CNavItem>
          <CNavItem href="#" onClick={()=> setShowTap('out')} className={showTap == "out" && 'active'}><CIcon customClassName="nav-icon" icon={cilArrowLeft}  /> OUT </CNavItem>
          
        </CSidebarNav>
        <CSidebarNav>
          <CNavTitle>Manage</CNavTitle>
           <CNavItem href="#" onClick={()=> setShowTap('stores')} className={showTap == "stores" && 'active'}><CIcon customClassName="nav-icon" icon={cilArrowLeft}  /> Stores </CNavItem>
          <CNavItem href="#" onClick={()=> setShowTap('partions')} className={showTap == "partions" && 'active'}><CIcon customClassName="nav-icon" icon={cilArrowLeft}  /> Partions </CNavItem>
          <CNavItem href="#" onClick={()=> setShowTap('shelfes')} className={showTap == "shelfes" && 'active'}><CIcon customClassName="nav-icon" icon={cilArrowLeft}  /> Shelves </CNavItem>
         

        </CSidebarNav>
      </CSidebar>
      <CContainer style={{paddingTop:'4%'}}>
      <div style={{border:'5px solid #80808024' , margin:10 , padding:20}} className='shadow-sm'> 
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
        {showTap == "shelfes" &&
         <Shelves />
        }
        {showTap == "boxes" &&
         <Boxes />
        }
      </div>
        

      </CContainer>
    </div>
  );
}

export default App;
