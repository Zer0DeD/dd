'use client';

import React, { useState } from 'react';
import axiosClassic from '../api/intercetors';

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
      console.log('file updated');
      setFile(file);

      const previewUrl = URL.createObjectURL(file);
      console.log('previes updated');
      setPreview(previewUrl);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      console.error('file not found');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('file sended');
      const res = await axiosClassic.post('/ai', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'arraybuffer', // Set the response type to 'arraybuffer'
      });
      console.log('file received');

      const imageUrl = `data:image/jpg;base64,${Buffer.from(res.data).toString(
        'base64'
      )}`;
      console.log('response updated');
      setResponse({
        error: false,
        message: 'success',
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.error('Ошибка загрузки файла, повторите попытку позже:', error);
      setResponse({
        error: true,
        message: 'Ошибка загрузки файла, повторите попытку позже',
        imageUrl: '',
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          type="file"
          accept="image/tif"
          onChange={handleFileChange}
        ></Input>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8',
          }}
        >
          {preview && (
            <span>
              <Typography.Title level={3}>Превью файла:</Typography.Title>
              <Image
                src={preview}
                alt="Image preview"
                style={{
                  maxWidth: '500px',
                  maxHeight: '500px',
                  margin: '0 auto',
                }}
              />
            </span>
          )}
          {response && (
            <span>
              {/* <Typography.Paragraph>{response.message}</Typography.Paragraph> */}
              <Typography.Title level={3}>
                Результат работы программы:
              </Typography.Title>
              {response.imageUrl && (
                <Image
                  src={response.imageUrl}
                  alt="Полученное"
                  style={{
                    maxWidth: '500px',
                    maxHeight: '500px',
                    margin: '0 auto',
                  }}
                />
              )}
            </span>
          )}
        </div>
        {!response && (
          <Button disabled={preview === null} type="primary" htmlType="submit">
            Загрузить
          </Button>
        )}
        {response && (
          <Button
            type="primary"
            onClick={() => {
              setFile(null);
              setPreview(null);
              setResponse(null);
            }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Сбросить
          </Button>
        )}
      </form>
    </>
  );
}
