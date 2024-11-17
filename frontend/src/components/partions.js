import { CTable, CButton, CTableRow, CTableBody, CTableDataCell, CRow, CCol, CFormInput } from '@coreui/react';
import { useEffect, useState } from 'react';
import { Delete } from '../functions/delete.js';
import { Fetch } from '../functions/fetch.js';
import axios from 'axios'
const Partions = () => {

    const [partionNumber , setPartionNumber] = useState()
    const [partionsData, setPartionsData] = useState([])
    const deletePrtion = async (id) => {

        try {
            const response = await axios.post('http://localhost:4000/partion/delete', {
                id
            });

            Fetch('partions')
        } catch (error) {
            console.log(error, 'error while adding store')
            alert(error)
        }

    }
    const fetchPartions = async () => {
        try {
            const response = await axios.get('http://localhost:4000/partion/all');
            setPartionsData(response.data);
        } catch (error) {
            console.error('Error fetching stores:', error);
        }
    };
    useEffect(() => {
        //const partionsD =  Fetch('partion')
       // console.log(partionsD)
       // setPartionsData(partionsD)
        fetchPartions()
    }, []);
    return (
        <>
            <p className='text-center'>Partions</p>
            <CTable bordered>

            <CTableBody>
                {partionsData && partionsData.map(
                    (partion) => (
                        <CTableRow key={partion._id}>
                            <CTableDataCell >{partion.partionNumber}</CTableDataCell>
                            <CTableDataCell onClick={() => Delete(partion._id , 'partion')}>delete</CTableDataCell>
                        </CTableRow>
                    )
                )}

            </CTableBody>
            </CTable>
            <CRow className="g-3">
                <CCol xs>
                    <CFormInput placeholder="Partion Number" aria-label="Partion Number" />
                </CCol>
                <CCol xs>
                    <CFormInput type='number' placeholder="Partion" aria-label="Partion" />
                </CCol>
                <CCol xs>
                    <CFormInput type='number' placeholder="Shelf" aria-label="Shelf" />
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

export default Partions