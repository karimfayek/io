import axios from 'axios'
export const Fetch = async (from) => {
    try {
        const response = await axios.get(`http://localhost:4000/${from}/all`);
        console.log(response.data, 'inside fetch' )
        return(response.data);
        
    } catch (error) {
        console.error('Error fetching stores:', error);
    }
};