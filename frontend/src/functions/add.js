import axios from 'axios'
import { Fetch } from './fetch';


export const Add = async (id, from) => {

    try {
        const response = await axios.post(`http://localhost:4000/${from}/add`, {
            id
        });

        Fetch(from)
    } catch (error) {
        console.log(error, 'error while adding store')
        alert(error)
    }

}