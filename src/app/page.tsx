'use client';

import axiosClassic from '@/api/intercetors';
import axios from 'axios';
import React, { MouseEventHandler, useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [response, setResponse] = useState<{
    message: string;
    imageUrl: string;
  } | null>(null);

  const [message, setMessage] = useState<string | null>(null);

  const handleMessage = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const res = await axiosClassic.get('/', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.data) {
        console.log('no data');
      }

      const data = res.data;
      console.log(data);
      setMessage(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // TODO: поменять путь для нейронки
      const res = await axiosClassic.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponse(res.data);
    } catch (error) {
      console.error('Ошибка загрузки файла, повторите попытку позже:', error);
      setResponse({
        message: 'Ошибка загрузки файла, повторите попытку позже',
        imageUrl: '',
      });
    }
  };

  return (
    <div>
      <h1>Выберете файл</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/jpeg" onChange={handleFileChange} />
        {preview && (
          <div>
            <h3>Превью файла:</h3>
            <img
              src={preview}
              alt="Image preview"
              style={{ maxWidth: '300px', maxHeight: '300px' }}
            />
          </div>
        )}
        <button type="submit">Загрузить</button>
        <div>
          <button onClick={handleMessage}>send test request</button>
          {message && <h2>{message}</h2>}
        </div>
      </form>
      {response && (
        <div>
          <p>{response.message}</p>
          {response.imageUrl && <img src={response.imageUrl} alt="Uploaded" />}
        </div>
      )}
    </div>
  );
}
