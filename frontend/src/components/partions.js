import { CTable, CButton, CTableRow, CTableBody, CTableDataCell, CRow, CCol, CFormInput, CFormSelect } from '@coreui/react';
import { useEffect, useState } from 'react';
import { Delete } from '../functions/delete.js';
import { Fetch } from '../functions/fetch.js';
import axios from 'axios'
const Partions = () => {

    const [partionNumber, setPartionNumber] = useState()
    const [storeId, setStoreId] = useState()
    const [partionsData, setPartionsData] = useState([])
    const [storessData, setStoresData] = useState([])

    const addPartion = async () => {

        try {

            const response = await axios.post('http://localhost:4000/partion/add', {
                partionNumber, store: storeId
            });
            setPartionsData((prevState) => [...prevState, response.data])

        } catch (error) {

            console.log(error, 'error while adding Partion')
            alert(error)
        }

    }
    const deletePrtion = async (id) => {

        try {
            await Delete(id, 'partion')

            setPartionsData((prevState) => prevState.filter((partion) => partion._id !== id))

        } catch (error) {
            console.log(error, 'error while adding store')
            alert(error)
        }

    }

    const fetchStoresAndpartions = async () => {
        try {
            const response = await axios.get('http://localhost:4000/store/all');
            setStoresData(response.data);
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
        fetchStoresAndpartions()
    }, []);
    return (
        <>
            <h1 className='text-center'>Partions</h1>
            <CTable bordered>

                <CTableBody>
                    {partionsData && partionsData.map(
                        (partion) => (
                            <CTableRow key={partion._id}>
                                <CTableDataCell >{partion.partionNumber}</CTableDataCell>
                                <CTableDataCell >{partion.store?.title || 'No store defined'}</CTableDataCell>
                                <CTableDataCell onClick={() => deletePrtion(partion._id)}>delete</CTableDataCell>
                            </CTableRow>
                        )
                    )}

                </CTableBody>
            </CTable>
            <CRow className="g-3">
                <CCol xs>
                    <CFormInput placeholder="Partion Number" aria-label="Partion Number" defaultValue={partionNumber} onChange={(v) => setPartionNumber(v.target.value)} />
                </CCol>
                <CCol xs>
                    <CFormSelect aria-label="Default select example" onChange={(v) => setStoreId(v.target.value)}>
                        <option>Open this select menu</option>
                        {storessData && storessData.map(
                            (store) => (
                                <option value={store._id} key={store._id}>{store.title}</option>
                            )
                        )}
                    </CFormSelect>
                </CCol>


            </CRow>
            <CRow className='d-block'>
                <CCol xs="auto">
                    <CButton className="mt-5 d-block m-auto" color="primary" type="submit" size='lg' onClick={() => addPartion()}>Add</CButton>
                </CCol>
            </CRow>
        </>
    )
}

export default Partions