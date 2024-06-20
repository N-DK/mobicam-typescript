import { Avatar, Empty, List, Spin } from 'antd';
import { Record } from '../../types';
import { LoadingOutlined } from '@ant-design/icons';
import { formatDate } from '../../utils';

const Warning: React.FC<{ records: Record[]; isRefresh: boolean }> = ({
    records,
    isRefresh,
}) => {
    return (
        <div>
            <div>
                {isRefresh ? (
                    <div className="flex justify-center items-center">
                        <Spin
                            indicator={<LoadingOutlined spin />}
                            size="large"
                        />
                    </div>
                ) : records?.length > 0 ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={records}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                                        />
                                    }
                                    title={`Xe ${item.vid} đi ${
                                        item.in_time !== null ? 'vào' : 'ra'
                                    } vùng ${item.region_name}`}
                                    description={`Thời gian ${
                                        item.in_time !== null
                                            ? `vào ${formatDate(item.in_time)}`
                                            : `ra ${
                                                  item.out_time &&
                                                  formatDate(item.out_time)
                                              }`
                                    }`}
                                />
                            </List.Item>
                        )}
                    />
                ) : (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Trống"
                    />
                )}
            </div>
        </div>
    );
};

export default Warning;
