import axios from 'axios';
import { Repository } from '../interfaces/Repository';

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const fetchRepositories = async (): Promise<Repository[]> => {
  try {
    const response = await axios.get<Repository[]>(
      `${GITHUB_API_URL}/user/repos`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error obteniendo repositorios:',
        error.response?.data || error.message
      );
    } else {
      console.error('Error desconocido:', error);
    }

    return [];
  }
};