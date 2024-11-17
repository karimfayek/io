import axios from 'axios'
import { Fetch } from './fetch';
export const Delete = async (id, from) => {

    try {
        const response = await axios.post(`http://localhost:4000/${from}/delete`, {
            id
        });

        Fetch(from)
    } catch (error) {
        console.log(error, 'error while adding store')
        alert(error)
    }

}