import { Empty } from 'antd';

const Warning: React.FC = () => {
    return (
        <div>
            <div>
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Trống"
                />
            </div>
        </div>
    );
};

export default Warning;
