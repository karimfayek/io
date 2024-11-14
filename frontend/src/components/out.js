import { CTable, CButton, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell ,CRow ,CCol,CFormInput} from '@coreui/react';

const Out = () => {
    return (
<>
<p className='text-center'>Out</p>
<p className='text-center'>Partion : _ | Shelf : _</p>
        <CTable bordered>

            <CTableBody>
                {Array.from({ length: 3 }).map(
                    (_, rowIndex) => (
                        <CTableRow key={rowIndex}>
                            {Array.from({ length: 50 }).map(
                                (_, colIndex) => (
                                    <CTableDataCell key={colIndex}>-</CTableDataCell>
                                )
                            )}
                        </CTableRow>
                    )
                )}

            </CTableBody>
        </CTable>
        <CRow className="g-3">
            <CCol xs>
                <CFormInput placeholder="Serial" aria-label="Serial"/>
            </CCol>
            <CCol xs>
                <CFormInput type='number'  placeholder="Partion" aria-label="Partion"/>
            </CCol>
            <CCol xs>
                <CFormInput type='number' placeholder="Shelf" aria-label="Shelf"/>
            </CCol>
           
</CRow>
 <CRow className='d-block'>
 <CCol xs="auto">
    <CButton className="mt-5 d-block m-auto" color="primary" type="submit" size='lg'>Submit</CButton>
  </CCol>
  </CRow>
</>
    )
}

export default Out