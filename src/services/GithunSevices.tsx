import axios from 'axios';
import type { Repository } from '../src/interfaces/Repository';
import type { GithubUser } from '../src/interfaces/GithubUser';
import type { RepositoryPayload } from '../src/interfaces/RepositoryPayload';

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL as string | undefined;
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN as string | undefined;

type GithubRepo = {
  id: number;
  name: string;
  description?: string | null;
  language?: string | null;
  owner: { login: string; avatar_url: string };
};

const apiClient = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `token ${GITHUB_API_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  },
});

export const fetchRepositories = async (): Promise<Repository[]> => {
  try {
    const response = await apiClient.get<GithubRepo[]>('/user/repos', {
      params: {
        per_page: 100,
        sort: 'updated',
        direction: 'desc',
        affiliation: 'owner,collaborator',
        t: Date.now(),
      },
    });
    return response.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description ?? undefined,
      language: repo.language ?? undefined,
      owner: repo.owner,
    }));
  } catch (error) {
    console.error('Error obteniendo repositorios:', error);
    return [];
  }
};

export const createRepository = async (repository: RepositoryPayload): Promise<Repository | null> => {
  try {
    const response = await apiClient.post('/user/repos', repository);
    if (response.status !== 201) {
      throw new Error(`Error creando repositorio: ${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    throw new Error(`${(error as Error).message}`)
  }
};

export const fetchUserInfo = async (): Promise<GithubUser | null> => {
  try {
    const response = await apiClient.get<GithubUser>('/user');
    return response.data;
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
};