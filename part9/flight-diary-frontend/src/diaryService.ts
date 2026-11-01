import axios from "axios";

import { DiaryEntry, NewDiaryEntry } from "./types";

const baseUrl = `${import.meta.env.VITE_API_URL}/api/diaries`;

export const getAllDiaries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  
  return response.data;
};

export const createDiary = async (entry: NewDiaryEntry): Promise<DiaryEntry> => {
  const response = await axios.post<DiaryEntry>(baseUrl, entry);

  return response.data;
};