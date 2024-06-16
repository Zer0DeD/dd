'use client';

import axiosClassic from '@/api/intercetors';
import React, { useState } from 'react';

import { Button, Input, Typography, Image } from 'antd';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [response, setResponse] = useState<{
    error: boolean;
    message: string;
    imageUrl: string;
  } | null>(null);

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
      const res = await axiosClassic.post('/ai', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponse(res.data);
    } catch (error) {
      console.error('Ошибка загрузки файла, повторите попытку позже:', error);
      setResponse({
        error: true,
        // message: 'Ого, это же Кирюха!!!',
        message: 'Ошибка загрузки файла, повторите попытку позже',
        imageUrl: '',
      });
    }
  };

  // style={{
  //   padding: 10,
  //   margin: 10,
  //   display: 'flex',
  // }}
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="file"
          accept="image/jpeg"
          onChange={handleFileChange}
        ></Input>

        <div style={{ display: 'flex', alignContent: 'center' }}>
          {preview && (
            <div>
              {/* <div style={{ padding: 10, margin: 10 }}> */}
              <Typography.Title level={3}>Превью файла:</Typography.Title>
              <Image
                src={preview}
                alt="Image preview"
                style={{ maxWidth: '300px', maxHeight: '300px' }}
              />
            </div>
          )}
          {response && (
            <div>
              <Typography.Paragraph>{response.message}</Typography.Paragraph>
              {response.imageUrl && (
                <Image src={response.imageUrl} alt="Uploaded" />
              )}
            </div>
          )}
        </div>
        {!response && (
          <Button disabled={preview === null} type="primary" htmlType="submit">
            Загрузить
          </Button>
        )}
      </form>
    </div>
  );
}
