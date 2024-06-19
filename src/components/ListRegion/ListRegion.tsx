import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Empty, Spin } from 'antd';
import { Region } from '../../types';
import { useState } from 'react';

const ListRegion: React.FC<{ regions: Region[]; reload: () => void }> = ({
    regions,
    reload,
}) => {
    const [loading, setLoading] = useState(false);

    const handleReload = async () => {
        setLoading(true);
        await reload();
        setLoading(false);
    };

    return (
        <div>
            <div>
                {regions ? (
                    <div>OKE {regions?.length}</div>
                ) : loading ? (
                    <div className="flex justify-center items-center">
                        <Spin
                            indicator={<LoadingOutlined spin />}
                            size="large"
                        />
                    </div>
                ) : (
                    <Empty
                        description="Có lỗi khi tải dữ liệu!"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    >
                        <Button
                            onClick={handleReload}
                            type="primary"
                            icon={<ReloadOutlined />}
                        >
                            Tải lại
                        </Button>
                    </Empty>
                )}
            </div>
        </div>
    );
};

export default ListRegion;
