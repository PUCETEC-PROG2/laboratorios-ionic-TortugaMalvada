import axios from 'axios';
import { Repository } from '../interfaces/Repository';

console.log(import.meta.env.VITE_GITHUB_TOKEN);
console.log(import.meta.env.VITE_GITHUB_API_TOKEN);

export const fetchRepositories = async (): Promise<Repository[]> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_GITHUB_API_URL}/user/repos`,{
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
        },
        params: {
          sort: 'created',
          per_page: 100,
          direction: 'desc',
          affiliation: 'owner',
          t: Date.now() // Cache busting parameter
        },
      });
      if (response.status !== 200) {
        throw new Error(`Error obteniendo repositorios: ${response.statusText}`);
      }
    return response.data;
  } catch (error) {
      console.error('Error obteniendo repositorios:', error);
      return [];
  }
};