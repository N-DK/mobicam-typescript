import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { Avatar, Button, Empty, List, Spin } from 'antd';
import { Region } from '../../types';
import { useState } from 'react';

const ListRegion: React.FC<{
    regions: Region[];
    reload: () => void;
    isRefresh: boolean;
}> = ({ regions, reload, isRefresh }) => {
    const [loading, setLoading] = useState(false);

    const handleReload = async () => {
        setLoading(true);
        await reload();
        setLoading(false);
    };

    return (
        <div>
            <div>
                {regions && regions.length > 0 ? (
                    isRefresh ? (
                        <div className="flex justify-center items-center">
                            <Spin
                                indicator={<LoadingOutlined spin />}
                                size="large"
                            />
                        </div>
                    ) : (
                        <List
                            itemLayout="horizontal"
                            dataSource={regions}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                                            />
                                        }
                                        title={item.name}
                                    />
                                </List.Item>
                            )}
                        />
                    )
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
