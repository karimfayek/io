import { CTable, CButton, CTableRow, CTableBody, CTableDataCell, CRow, CCol, CFormInput } from '@coreui/react';
import { useEffect, useState } from 'react';
import axios from 'axios'

const Stores = () => {

    const [storeName, setStoreName] = useState("")
    const [storesdata, setStoresData] = useState([])

    const addStore = async () => {

        try {
            const response = await axios.post('http://localhost:4000/store/add', {
                storeName
            });
            setStoresData((prevState) => [...prevState, response.data])
        } catch (error) {
            console.log(error, 'error while adding store')
            alert(error)
        }

    }
    const deleteStore = async (id) => {

        try {
            const response = await axios.post('http://localhost:4000/store/delete', {
                id
            });

            fetchStores()
        } catch (error) {
            console.log(error, 'error while adding store')
            alert(error)
        }

    }
    // Fetch function
    const fetchStores = async () => {
        try {
            const response = await axios.get('http://localhost:4000/store/all');
            setStoresData(response.data);
        } catch (error) {
            console.error('Error fetching stores:', error);
        }
    };

    // fetchStores on component mount
    useEffect(() => {
        fetchStores();
    }, []);

    const handleStoreNameChange = (e) => {
        setStoreName(e.target.value)
    }
    return (
        <>
            <h1 className='text-center'>Stores</h1>
            <CTable bordered>

                <CTableBody>
                    {storesdata && storesdata.map(
                        (store) => (
                            <CTableRow key={store._id}>
                                <CTableDataCell >{store.title}</CTableDataCell>
                                <CTableDataCell onClick={() => deleteStore(store._id)}>delete</CTableDataCell>
                            </CTableRow>
                        )
                    )}

                </CTableBody>
            </CTable>
            <CRow className="g-3">
                <CCol xs>
                    <CFormInput placeholder="Store Name" aria-label="Store Name" defaultValue={storeName} onChange={handleStoreNameChange} />

                </CCol>


            </CRow>
            <CRow className='d-block'>
                <CCol xs="auto">
                    <CButton className="mt-5 d-block m-auto" color="primary" type="submit" size='lg' onClick={() => addStore()}>Add</CButton>
                </CCol>
            </CRow>
        </>
    )
}

export default Stores