import { Layout, Typography } from 'antd';
const { Header } = Layout;

export default function DDHeader() {
  return (
    // <Header
    //   style={{
    //     position: 'sticky',
    //     top: 0,
    //     zIndex: 1,
    //     width: '100%',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //   }}
    // >
    //   {/* <Typography.Title
    //     level={2}
    //     style={{ color: 'whitesmoke', padding: '20px' }}
    //   >
    //     Цифровая кафедра
    //   </Typography.Title> */}
    //   <h2
    //     style={{
    //       color: 'whitesmoke',
    //       fontFamily: 'Helvetica Neue',
    //       fontSize: '24px',
    //       fontWeight: 'bold',
    //     }}
    //   >
    //     Цифровая кафедра
    //   </h2>
    // </Header>
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
