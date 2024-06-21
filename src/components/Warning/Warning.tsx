import { Empty, List, Spin } from 'antd';
import { Record } from '../../types';
import { LoadingOutlined } from '@ant-design/icons';
import { formatDate } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

const Warning: React.FC<{
    records: Record[];
    isRefresh: boolean;
    setCarActive: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = ({ records, isRefresh, setCarActive }) => {
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
                        renderItem={(item) => (
                            <List.Item
                                style={{ cursor: 'pointer' }}
                                onClick={() => setCarActive(item.vid)}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <img
                                            src={`https://cdn3.iconfinder.com/data/icons/parking-signs/226/parking-area-01${
                                                item.in_time !== null ? 1 : 2
                                            }-512.png`}
                                            width={70}
                                            className="object-center object-contain"
                                        />
                                    }
                                    title={`Xe ${item.vid} đi ${
                                        item.in_time !== null ? 'vào' : 'ra'
                                    } ${item.region_name}`}
                                    description={
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faClock}
                                                className="mr-2"
                                            />
                                            Thời gian
                                            {item.in_time !== null
                                                ? ` vào ${formatDate(
                                                      item.in_time,
                                                  )}`
                                                : ` ra ${
                                                      item.out_time &&
                                                      formatDate(item.out_time)
                                                  }`}
                                        </div>
                                    }
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
