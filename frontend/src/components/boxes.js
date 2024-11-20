import { CTable, CButton, CTableRow, CTableBody, CTableDataCell, CRow, CCol, CFormInput, CFormSelect } from '@coreui/react';
import { useEffect, useState } from 'react';
import { Delete } from '../functions/delete.js';
import axios from 'axios'
const Boxes = () => {

    const [boxSerial, setBoxSerial] = useState()
    const [shelfId, setShelfId] = useState()
    const [boxesData, setBoxesData] = useState([])
    const [shelfData, setShelfsData] = useState([])

    const addBox = async () => {

        try {

            const response = await axios.post('http://localhost:4000/box/add', {
                serial:boxSerial , shelf: shelfId
            });
            setBoxesData((prevState) => [...prevState, response.data])

        } catch (error) {

            console.log(error, 'error while adding Box')
            alert(error.response.data.details)
        }

    }
    const deleteBox= async (id) => {

        try {
            await Delete(id, 'box')

            setBoxesData((prevState) => prevState.filter((box) => box._id !== id))

        } catch (error) {
            console.log(error, 'error while adding box')
            alert(error)
        }

    }

    const fetchShelfsAndBoxes = async () => {
        try {
            const response = await axios.get('http://localhost:4000/shelf/all');
            setShelfsData(response.data);
        } catch (error) {
            console.error('Error fetching shelves:', error);
        }
        try {
            const response = await axios.get('http://localhost:4000/box/all');
            setBoxesData(response.data);
        } catch (error) {
            console.error('Error fetching boxes:', error);
        }
    };
    useEffect(() => {
        //const partionsD =  Fetch('partion')
        // console.log(partionsD)
        // setPartionsData(partionsD)
        fetchShelfsAndBoxes()
    }, []);
    return (
        <>
            <h1 className='text-center'>Boxes</h1>
            <CTable bordered>

                <CTableBody>
                    {boxesData && boxesData.map(
                        (box) => (
                            <CTableRow key={box._id}>
                                <CTableDataCell >{box.serial}</CTableDataCell>
                                <CTableDataCell >Shelf : {box.shelf?.number || 'No Shelf defined'} -  in Partion : {box.shelf?.partion?.partionNumber || 'No Store defined'} - in Store : {box.shelf?.partion?.store?.title || 'No Store defined'}</CTableDataCell>
                               
                                <CTableDataCell onClick={() => deleteBox(box._id)}>delete</CTableDataCell>
                            </CTableRow>
                        )
                    )}

                </CTableBody>
            </CTable>
            <CRow className="g-3">
                <CCol xs>
                    <CFormInput placeholder="Box Serial" aria-label="Box Serial" defaultValue={boxSerial} onChange={(v) => setBoxSerial(v.target.value)} />
                </CCol>
                <CCol xs>
                    <CFormSelect aria-label="Select a Shelf" onChange={(v) => setShelfId(v.target.value)}>
                        <option>Select a Shelf</option>
                        {shelfData && shelfData.map(
                            (shelf) => (
                                <option value={shelf._id} key={shelf._id}> shelf: {shelf.number} - Partion:{shelf.partion?.partionNumber} - Store:{shelf.partion?.store?.title}</option>
                            )
                        )}
                    </CFormSelect>
                </CCol>


            </CRow>
            <CRow className='d-block'>
                <CCol xs="auto">
                    <CButton className="mt-5 d-block m-auto" color="primary" type="submit" size='lg' onClick={() => addBox()}>Add</CButton>
                </CCol>
            </CRow>
        </>
    )
}

export default Boxes