import {
    EllipsisOutlined,
    LoadingOutlined,
    ReloadOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Empty, List, Modal, Spin, message } from 'antd';
import { Region } from '../../types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircle,
    faSquare,
    faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import {
    faDrawPolygon,
    faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { deleteRegion } from '../../services';

const regionImage: Record<string, JSX.Element> = {
    circle: <FontAwesomeIcon icon={faCircle} />,
    polygon: <FontAwesomeIcon icon={faDrawPolygon} />,
    rectangle: <FontAwesomeIcon icon={faSquare} />,
};

const ListRegion: React.FC<{
    regions: Region[];
    reload: () => void;
    isRefresh: boolean;
    openModalEdit: (region: Region) => void;
}> = ({ regions, reload, isRefresh, openModalEdit }) => {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [modal, contextHolderModal] = Modal.useModal();
    const handleReload = async () => {
        setLoading(true);
        await reload();
        setLoading(false);
    };

    const handleDeleteRegion = async (_id: string | undefined) => {
        if (_id) {
            const res = await deleteRegion(_id);
            messageApi.open({
                type: 'success',
                content: 'Xóa vùng thành công',
            });
            console.log(res);
            await reload();
        }
    };

    return (
        <div>
            {contextHolder}
            {contextHolderModal}
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
                            renderItem={(item) => (
                                <List.Item style={{ cursor: 'pointer' }}>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center">
                                            <div
                                                className="text-3xl mr-4"
                                                style={{
                                                    color: `${item.color}`,
                                                }}
                                            >
                                                {regionImage[item.type]}
                                            </div>
                                            {item.name}
                                        </div>
                                        <Dropdown
                                            menu={{
                                                items: [
                                                    {
                                                        label: (
                                                            <button
                                                                onClick={async () => {
                                                                    const confirmed =
                                                                        await modal.confirm(
                                                                            {
                                                                                title: 'Xóa vùng',
                                                                                content:
                                                                                    (
                                                                                        <div>
                                                                                            Bạn
                                                                                            có
                                                                                            chắc
                                                                                            xóa
                                                                                            vùng{' '}
                                                                                            {
                                                                                                item.name
                                                                                            }
                                                                                        </div>
                                                                                    ),
                                                                                okText: 'Xóa',
                                                                                cancelText:
                                                                                    'Hủy',
                                                                            },
                                                                        );
                                                                    if (
                                                                        confirmed
                                                                    )
                                                                        handleDeleteRegion(
                                                                            item._id,
                                                                        );
                                                                }}
                                                                className="py-1 w-full flex justify-start items-center"
                                                            >
                                                                {' '}
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faTrashCan
                                                                    }
                                                                    className="mr-2"
                                                                />{' '}
                                                                Xóa
                                                            </button>
                                                        ),
                                                        key: '0',
                                                    },
                                                    {
                                                        label: (
                                                            <button
                                                                onClick={() =>
                                                                    openModalEdit(
                                                                        item,
                                                                    )
                                                                }
                                                                className="py-1 w-full flex justify-start items-center"
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faPenToSquare
                                                                    }
                                                                    className="mr-2"
                                                                />{' '}
                                                                Chỉnh sửa
                                                            </button>
                                                        ),
                                                        key: '1',
                                                    },
                                                ],
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button
                                                type="text"
                                                icon={<EllipsisOutlined />}
                                            />
                                        </Dropdown>
                                    </div>
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
                        description="Dữ liệu trống"
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
