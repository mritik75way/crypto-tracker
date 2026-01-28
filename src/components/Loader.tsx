import { Spin } from 'antd';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-64 w-full">
      <Spin size="large" tip="Loading data..." />
    </div>
  );
};

export default Loader;