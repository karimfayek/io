import { CTable, CButton, CTableRow, CTableBody, CTableDataCell, CRow, CCol, CFormInput, CFormSelect } from '@coreui/react';
import { useEffect, useState } from 'react';
import { Delete } from '../functions/delete.js';
import axios from 'axios'
const Shelves = () => {

    const [shelfNumber, setShelfNumber] = useState()
    const [partionId, setPartionId] = useState()
    const [shelfsData, setShelfsData] = useState([])
    const [partionsData, setPartionsData] = useState([])

    const addShelf = async () => {

        try {

            const response = await axios.post('http://localhost:4000/shelf/add', {
                number:shelfNumber , partion: partionId
            });
            setShelfsData((prevState) => [...prevState, response.data])

        } catch (error) {

            console.log(error, 'error while adding Shelf')
            alert(error.response.data.message)
        }

    }
    const deleteShelf= async (id) => {

        try {
            await Delete(id, 'shelf')

            setShelfsData((prevState) => prevState.filter((shelf) => shelf._id !== id))

        } catch (error) {
            console.log(error, 'error while adding shelf')
            alert(error)
        }

    }

    const fetchShelfsAndpartions = async () => {
        try {
            const response = await axios.get('http://localhost:4000/shelf/all');
            setShelfsData(response.data);
        } catch (error) {
            console.error('Error fetching stores:', error);
        }
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
        fetchShelfsAndpartions()
    }, []);
    return (
        <>
            <h1 className='text-center'>Shelves</h1>
            <CTable bordered>

                <CTableBody>
                    {shelfsData && shelfsData.map(
                        (shelf) => (
                            <CTableRow key={shelf._id}>
                                <CTableDataCell >{shelf.number}</CTableDataCell>
                                <CTableDataCell >Partion : {shelf.partion?.partionNumber || 'No partions defined'} in Store : {shelf.partion?.store?.title || 'No Store defined'}</CTableDataCell>
                                <CTableDataCell >{shelf.boxes?.length } box/s</CTableDataCell>
                                <CTableDataCell onClick={() => deleteShelf(shelf._id)}>delete</CTableDataCell>
                            </CTableRow>
                        )
                    )}

                </CTableBody>
            </CTable>
            <CRow className="g-3">
                <CCol xs>
                    <CFormInput placeholder="Shelf Number" aria-label="Shelf Number" defaultValue={shelfNumber} onChange={(v) => setShelfNumber(v.target.value)} />
                </CCol>
                <CCol xs>
                    <CFormSelect aria-label="Select a Partion" onChange={(v) => setPartionId(v.target.value)}>
                        <option>Select a Partion</option>
                        {partionsData && partionsData.map(
                            (partion) => (
                                <option value={partion._id} key={partion._id}>{partion.partionNumber} - {partion.store.title}</option>
                            )
                        )}
                    </CFormSelect>
                </CCol>


            </CRow>
            <CRow className='d-block'>
                <CCol xs="auto">
                    <CButton className="mt-5 d-block m-auto" color="primary" type="submit" size='lg' onClick={() => addShelf()}>Add</CButton>
                </CCol>
            </CRow>
        </>
    )
}

export default Shelves