import { Layout, Typography } from 'antd';
const { Header } = Layout;

export default function DDHeader() {
  return (
    <header
      style={{
        backgroundColor: '#000',
        color: '#fff',
        padding: '1rem',
        height: 48,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <h2
        style={{
          paddingLeft: 10,
          margin: 0,
          fontFamily: 'Roboto, sans-serif',
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        Цифровая кафедра
      </h2>
    </header>
  );
}
