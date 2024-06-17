'use client';

import React, { useState } from 'react';
import axiosClassic from '../api/intercetors';

import { Button, Input, Typography, Image } from 'antd';

import DDHeader from '@/components/Header';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
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
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.error('Ошибка загрузки файла, повторите попытку позже:', error);
      setResponse({
        error: true,
        message: 'Ошибка, повторите попытку позже',
        imageUrl: '',
      });
      setLoading(false);
    }
  };

  return (
    <>
      <DDHeader />
      <Typography.Title
        level={2}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        WEB-приложение для анализа изображений с применением нейронных сетей
      </Typography.Title>
      <form onSubmit={handleSubmit} style={{ margin: 20 }}>
        <Input
          type="file"
          accept="image/tif"
          onChange={handleFileChange}
        ></Input>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
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
                  minWidth: '300px',
                  minHeight: '300px',
                  margin: '0 auto',
                }}
              />
            </span>
          )}
          {response && (
            <span>
              {response.error ? (
                <>
                  <Typography.Title level={3}>
                    {response.message}
                  </Typography.Title>
                  <div style={{ width: '500px', height: '500px' }}></div>
                </>
              ) : (
                <>
                  <Typography.Title level={3}>
                    Результат работы программы:
                  </Typography.Title>
                  <Image
                    src={response.imageUrl}
                    alt="Полученное"
                    style={{
                      maxWidth: '500px',
                      maxHeight: '500px',
                      minWidth: '300px',
                      minHeight: '300px',
                      margin: '0 auto',
                    }}
                  />
                </>
              )}
            </span>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            margin: 10,
            padding: 10,
          }}
        >
          {!response && (
            <Button
              disabled={preview === null}
              type="primary"
              htmlType="submit"
            >
              Загрузить
            </Button>
          )}
          {loading && <span> loading...</span>}
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
        </div>
      </form>
    </>
  );
}
