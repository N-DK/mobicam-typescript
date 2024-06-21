import MarkerClusterGroup from 'react-leaflet-cluster';
import MapWrapper from '../../components/MapWrapper/MapWrapper';
import { Car } from '../../components/Car';
import { Record, Region, Car as TypeCar } from '../../types';
import { useEffect, useState } from 'react';
import { getListVehicles } from '../../services/carService';
import { createClusterCustomIcon } from '../../utils';
import { io } from 'socket.io-client';
import { Button, Drawer, Modal, Space, Tabs, Tooltip, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faExpand,
    faMinus,
    faPerson,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
    CloseOutlined,
    PlusOutlined,
    ReloadOutlined,
    SaveOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { ListRegion } from '../../components/ListRegion';
import { Warning } from '../../components/Warning';
import { Form } from '../../components/FormAddRegion';
import { GeoAreaIcon } from '../../icons';
import { addRegion, getRecord, getRegion, updateRegion } from '../../services';

const Home: React.FC = () => {
    const [markers, setMarkers] = useState<TypeCar[]>([]);
    const [openPolygon, setOpenPolygon] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [regions, setRegions] = useState<Region[]>([]);
    const [disabled, setDisabled] = useState(true);
    const [newRegion, setNewRegion] = useState<Region>();
    const [messageApi, contextHolder] = message.useMessage();
    const [records, setRecords] = useState<Record[]>([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [carActive, setCarActive] = useState<string>();
    const [updateData, setUpdateData] = useState<Region>();

    const showModal = () => {
        if (updateData) setUpdateData(undefined);
        setIsModalOpen(true);
    };

    const handleReload = async () => {
        try {
            setIsRefresh(true);
            const [region, record] = await Promise.all([
                getRegion(),
                getRecord(),
            ]);
            setIsRefresh(false);
            setRecords(record);
            setRegions(region);
        } catch (error) {}
    };

    const handleOk = () => {
        if (newRegion) {
            if (updateData) newRegion._id = updateData._id;
            const fetch = async () => {
                setLoading(true);
                const res = updateData
                    ? await updateRegion(newRegion)
                    : await addRegion(newRegion);
                handleReload();
                console.log(res);
                messageApi.open({
                    type: 'success',
                    content: updateData
                        ? 'Lưu vùng thành công'
                        : 'Thêm vùng thành công',
                });
                setLoading(false);
                setIsModalOpen(false);
            };
            fetch();
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showDrawer = () => {
        setOpenPolygon(true);
    };

    const onClose = () => {
        setOpenPolygon(false);
    };

    const handleOpenEdit = (region: Region) => {
        setUpdateData(region);
        setIsModalOpen(true);
    };

    // const onChange = (key: string) => {
    //     console.log(key);
    // };

    useEffect(() => {
        const socket = io('https://checkapp.midvietnam.com', {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        'X-Mobicam-Token':
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg4MSwiYXBwIjoibWlkdm4iLCJsZXZlbCI6MCwiY29tSUQiOi0xLCJpYXQiOjE3MTg3NzczMTEsImV4cCI6MTcxOTAzNjUxMX0.p10zlGeUX1LdpzD8IIN1I7ribSdjFHaTRZ8lhj7ZGok',
                    },
                },
            },
        });

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('statusVid', (data) => {
            setMarkers(data.data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const res = await getListVehicles();
            setMarkers(res?.data);
        };

        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            try {
                const [regionRes, recordRes] = await Promise.all([
                    getRegion(),
                    getRecord(),
                ]);
                setRegions(regionRes);
                setRecords(recordRes);
            } catch (error) {}
        };

        fetch();
    }, []);

    return (
        <div className="relative h-full">
            {contextHolder}
            {markers?.length > 0 && (
                <div className="h-full">
                    <div className="h-full">
                        <MapWrapper center={[markers[0]?.lat, markers[0]?.lng]}>
                            <MarkerClusterGroup
                                chunkedLoading
                                iconCreateFunction={createClusterCustomIcon}
                            >
                                {markers?.map((marker, index) => (
                                    <Car
                                        active={carActive === marker.name_Vid}
                                        key={index}
                                        data={marker}
                                    />
                                ))}
                            </MarkerClusterGroup>
                        </MapWrapper>
                    </div>
                </div>
            )}
            <div className="px-2 absolute h-10 bg-white z-[1000] w-full bottom-6 border-b flex justify-between items-center">
                <Space>
                    <Tooltip title="Phóng to">
                        <Button type="text" className="w-8 h-8 rounded btn">
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Thu nhỏ">
                        <Button type="text" className="w-8 h-8 rounded">
                            <FontAwesomeIcon icon={faMinus} />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Mở rộng vùng hiển thị phương tiện">
                        <Button type="text" className="w-8 h-8 rounded">
                            <FontAwesomeIcon icon={faExpand} />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Vị trí của tôi">
                        <Button type="text" className="w-8 h-8 rounded">
                            <FontAwesomeIcon icon={faPerson} />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Cài đặt">
                        <Button
                            type="text"
                            className="w-8 h-8 rounded"
                            icon={<SettingOutlined />}
                        ></Button>
                    </Tooltip>
                </Space>
                <Space>
                    <Tooltip title="Vùng địa lý">
                        <Button
                            onClick={showDrawer}
                            type="text"
                            className="w-8 h-8 rounded"
                            icon={<GeoAreaIcon />}
                        />
                    </Tooltip>
                </Space>
            </div>
            <Drawer
                title="VÙNG ĐỊA LÝ"
                placement={'right'}
                onClose={onClose}
                open={openPolygon}
                closable={false}
                styles={{
                    header: { padding: 8 },
                    body: { padding: 8, paddingTop: 2 },
                }}
                extra={
                    <Space>
                        <Button
                            type="primary"
                            onClick={handleReload}
                            icon={<ReloadOutlined />}
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={showModal}
                        >
                            Thêm mới
                        </Button>
                        <Button
                            type="text"
                            onClick={onClose}
                            icon={<CloseOutlined />}
                        />
                    </Space>
                }
            >
                <Tabs
                    defaultActiveKey="1"
                    centered
                    items={[
                        {
                            key: '1',
                            label: 'Danh sách vùng',
                            children: (
                                <ListRegion
                                    openModalEdit={handleOpenEdit}
                                    regions={regions}
                                    reload={handleReload}
                                    isRefresh={isRefresh}
                                />
                            ),
                        },
                        {
                            key: '2',
                            label: 'Cảnh báo',
                            children: (
                                <Warning
                                    records={records}
                                    isRefresh={isRefresh}
                                    setCarActive={setCarActive}
                                />
                            ),
                        },
                    ]}
                    // onChange={onChange}
                />
            </Drawer>
            <Modal
                destroyOnClose={true}
                centered
                title="Thêm vùng"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={updateData ? 'Lưu' : 'Thêm'}
                cancelText="Hủy"
                okButtonProps={{
                    icon: <SaveOutlined />,
                    disabled: disabled || loading,
                }}
                width={1200}
            >
                <Form
                    markers={markers}
                    setDisable={setDisabled}
                    setNewRegion={setNewRegion}
                    pendingAddRegion={loading}
                    updateData={updateData}
                />
            </Modal>
        </div>
    );
};

export default Home;
