import { ReloadOutlined } from '@ant-design/icons';
import { Button, Empty } from 'antd';

const ListRegion: React.FC = () => {
    return (
        <div>
            <div>
                <Empty
                    description="Có lỗi khi tải dữ liệu!"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                >
                    <Button type="primary" icon={<ReloadOutlined />}>
                        Tải lại
                    </Button>
                </Empty>
            </div>
        </div>
    );
};

export default ListRegion;
