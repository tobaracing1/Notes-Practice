import ky from "ky";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

interface LoginResponse {
  status: string;
  message: string;
  data: {
    accessToken: string;
  };
  error?: string;
}

interface CommonResult<T>{
  status:string;
  message:string;
  data:T
}
interface getUserLoggedResponse  {
  
    id: string;
    name: string;
    email: string;

}

interface RegisterResponse {
  status: string;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    hashedPassword: string;
  };
}

interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
  owner: string;
}

interface NotesResponse {
  status: string;
  message: string;
  data: Note[];
}

interface NoteResponse {
  status: string;
  message: string;
  data: Note;
}

interface ArchivedStatusResponse {
  status: string;
  message: string;
}

interface AddNoteResponse {
  status: string;
  message: string;
  data: {
    id: string;
    title: string;
    body: string;
    owner: string;
    archived: boolean;
    createdAt: string;
  };
}

interface deleteNoteResponse {
  status: string;
  message: string;
}

const BASE_URL = "https://notes-api.dicoding.dev/v1";

export function getAccessToken(): string | null {
  return localStorage.getItem("accessToken");
}

export function putAccessToken(accessToken: string): void {
  localStorage.setItem("accessToken", accessToken);
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  let message: string;
  try {
    const response: LoginResponse = await ky
      .post(`${BASE_URL}/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        json: {
          email,
          password,
        },
      })
      .json<LoginResponse>();

    console.log(response);

    if (response.status !== "success") {
      return {
        error: true,
        message: response.message,
        data: null,
      };
    }

    putAccessToken(response.data.accessToken);

    return {
      error: false,
      message: response.message,
      data: response.data,
    };
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
      data: null,
    };
  }
}

export async function register({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const response: RegisterResponse = await ky
      .post(`${BASE_URL}/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        json: {
          name,
          email,
          password,
        },
      })
      .json<RegisterResponse>();

    if (response.status !== "success") {
      return {
        error: true,
        message: response.message,
        data: null,
      };
    }

    return {
      error: false,
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error as string,
      data: null,
    };
  }
}

export async function fetchWithToken<T>(
  url: string,
  options: any = {}
): Promise<T> {
  try {
    const response = await ky(url, {
      ...options,
      headers: {
        // ...options tidak dapat diinisialisasi seperti yang dibawah
        // ...options,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }).json<T>();

    return response;
  } catch (error: any) {
    return error;
  }
}

export async function getUserLogged() {
  const response = await fetchWithToken<CommonResult<getUserLoggedResponse>>(
    `${BASE_URL}/users/me`
  );

  if (response.status !== "success") {
    return {
      error: true,
      data: null,
    };
  }

  return {
    error: false,
    data: response.data,
  };
}

export async function getActiveNotes() {
  const response = await fetchWithToken<NotesResponse>(`${BASE_URL}/notes`);

  if ("error" in response && response.error) {
    return { error: true, message: response.message, data: null };
  }

  const notesResponse = response as NotesResponse;

  if (notesResponse?.status !== "success") {
    return { error: true, message: "Failed to fetch active notes", data: null };
  }

  return { error: false, data: notesResponse.data };
}

export async function getArchivedNotes() {
  const response = await fetchWithToken<NotesResponse>(
    `${BASE_URL}/notes/archived`
  );

  if ("error" in response && response.error) {
    return { error: true, message: response.message, data: null };
  }

  const notesResponse = response as NotesResponse;

  if (notesResponse.status !== "success") {
    return {
      error: true,
      message: "Failed to fetch archived notes",
      data: null,
    };
  }

  return { error: false, data: notesResponse.data };
}

export async function getNote(noteId: string) {
  const response = await fetchWithToken<NoteResponse>(
    `${BASE_URL}/notes/${noteId}`
  );

  if ("error" in response && response.error) {
    return { error: true, message: response.message, data: null };
  }

  const NoteResponse = response as NoteResponse;

  if (NoteResponse.status !== "success") {
    return { error: true, message: response.message, data: null };
  }

  return {
    error: false,
    data: NoteResponse.data,
  };
}

export async function archiveNote(noteId: string) {
  const response = await fetchWithToken<ArchivedStatusResponse>(
    `${BASE_URL}/notes/${noteId}/archive`,
    {
      method: "POST",
    }
  );

  if ("error" in response) {
    return { error: true, message: response.message, data: null };
  }

  if (response.status !== "success") {
    return { error: true, message: "Failed to archive note", data: null };
  }

  return {
    error: false,
    message: response.message,
  };
}

export async function unarchiveNote(noteId: string) {
  const response = await fetchWithToken<ArchivedStatusResponse>(
    `${BASE_URL}/notes/${noteId}/unarchive`,
    {
      method: "POST",
    }
  );

  if ("error" in response) {
    return { error: true, message: response.message, data: null };
  }

  if (response.status !== "success") {
    return { error: true, message: "Failed to unarchive note", data: null };
  }

  return {
    error: false,
    message: response.message,
  };
}

export async function addNote({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  const response: AddNoteResponse = await fetchWithToken(`${BASE_URL}/notes`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    json: {
      title,
      body,
    },
  });

  if ("error" in response) {
    return { error: true, message: response.message, data: null };
  }

  if (response.status !== "success") {
    return { error: true, message: "Failed to add note", data: null };
  }

  return {
    error: false,
    message: "Note added successfully",
    data: response.data,
  };
}

export async function deleteNote({ noteId }: { noteId: string }) {
  const response = await fetchWithToken<deleteNoteResponse>(
    `${BASE_URL}/notes/${noteId}`,
    {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if ("error" in response) {
    return { error: true, message: response.message };
  }

  if (response.status !== "success") {
    return { error: true, message: "Failed to delete note" };
  }

  return {
    error: false,
    message: "Note delete successfully",
  };
}
