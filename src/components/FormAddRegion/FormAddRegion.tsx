import {
    Checkbox,
    ColorPicker,
    Form,
    Input,
    Spin,
    Switch,
    TreeSelect,
} from 'antd';
import MapWrapper from '../MapWrapper/MapWrapper';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Car } from '../Car';
import { Region, Car as TypeCar } from '../../types';
import { createClusterCustomIcon } from '../../utils';
import TextArea from 'antd/es/input/TextArea';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getListVehicles } from '../../services/carService';

type FormType = {
    markers: TypeCar[];
    setDisable: React.Dispatch<React.SetStateAction<boolean>>;
    setNewRegion: React.Dispatch<React.SetStateAction<Region | undefined>>;
};

const { SHOW_CHILD } = TreeSelect;

const FormAddRegion: React.FC<FormType> = ({
    markers,
    setDisable,
    setNewRegion,
}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [showVehicle, setShowVehicle] = useState(true);
    const [listVehicles, setListVehicles] = useState<TypeCar[]>();
    const [name, setName] = useState<string>('');
    const [layer, setLayer] = useState<{ type: string; bounds: number[][] }>();

    const handleShowVehicle = (checked: boolean) => {
        setShowVehicle(checked);
    };

    useEffect(() => {
        setDisable(!(name !== '' && layer));
        if (layer) {
            setNewRegion({
                type: layer.type,
                bounds: layer.bounds,
                // color?: string;
                name: name,
                isInWarning: 1,
                isOutWarning: 1,
                // vehicles?: string[];
                // note?: string;
                isDelete: false,
            });
        }
    }, [name, layer]);

    const handleCreated = (e: any) => {
        const layerType = e.layerType;
        const layer = e.layer;

        if (layer && layer._latlngs) {
            const latlngs = layer._latlngs[0].map(
                (item: { lat: number; lng: number }) => [item.lat, item.lng],
            );
            setLayer({ type: layerType, bounds: latlngs });
        } else {
            console.log('Layer does not have _latlngs property');
        }
    };

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 10);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const res = await getListVehicles();
            setListVehicles(res?.data);
        };

        fetch();
    }, []);

    return (
        <div className="border-t border-b">
            <div className="py-4">
                <div className="flex items-center h-[80vh]">
                    <div className="w-[350px] max-w-[50%] h-full mr-3 overflow-auto">
                        <Form layout="vertical">
                            <Form.Item
                                layout="vertical"
                                label={<b>Tên vùng</b>}
                                name="region"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Tên vùng không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item label="Màu nền">
                                <ColorPicker
                                    defaultValue={'#255DEC'}
                                    showText
                                />
                            </Form.Item>
                            <Form.Item label="Phương tiện">
                                <TreeSelect
                                    maxTagTextLength={30}
                                    maxTagCount={1}
                                    allowClear
                                    treeData={[
                                        {
                                            title: 'Tất cả',
                                            value: '0-0',
                                            key: '0-0',
                                            children: listVehicles?.map(
                                                (v) => ({
                                                    title: `${v.name_Vid} (${v.name_Vid}) (${v.key})`,
                                                    value: `${v.name_Vid}|${v.devId}`,
                                                    key: `${v.name_Vid}|${v.devId}`,
                                                }),
                                            ),
                                        },
                                    ]}
                                    treeCheckable={true}
                                    showCheckedStrategy={SHOW_CHILD}
                                    placeholder="Chọn phương tiện"
                                />
                            </Form.Item>
                            <Form.Item label="Loại cảnh báo">
                                <div className="rounded bg-[#e8e8e8] px-4 py-3 mb-3">
                                    <Checkbox defaultChecked={true}>
                                        Cảnh báo đi vào vùng
                                    </Checkbox>
                                </div>
                                <div className="rounded bg-[#e8e8e8] px-4 py-3">
                                    <Checkbox defaultChecked={true}>
                                        Cảnh báo ra khỏi vùng
                                    </Checkbox>
                                </div>
                            </Form.Item>
                            <Form.Item label="Ghi chú">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="flex-1 relative rounded overflow-hidden h-full">
                        {!loading && markers && markers?.length > 0 ? (
                            <MapWrapper
                                center={[markers[0]?.lat, markers[0]?.lng]}
                            >
                                <FeatureGroup>
                                    <EditControl
                                        draw={{
                                            rectangle: { showArea: false },
                                            marker: false,
                                            polyline: false,
                                            circlemarker: false,
                                        }}
                                        position="topright"
                                        onCreated={handleCreated}
                                    />
                                </FeatureGroup>
                                {showVehicle && (
                                    <MarkerClusterGroup
                                        chunkedLoading
                                        iconCreateFunction={
                                            createClusterCustomIcon
                                        }
                                    >
                                        {markers?.map((marker, index) => (
                                            <Car key={index} data={marker} />
                                        ))}
                                    </MarkerClusterGroup>
                                )}
                            </MapWrapper>
                        ) : (
                            <div className="bg-[#8b8b8b] bg-opacity-45 h-full flex justify-center items-center">
                                <Spin
                                    indicator={<LoadingOutlined spin />}
                                    size="large"
                                />
                            </div>
                        )}
                        <div className="absolute top-2 left-2 z-[1000] bg-[white] rounded-sm px-2    py-3 flex items-center">
                            <span className="mr-2">Hiển thị phương tiện:</span>
                            <Switch
                                defaultChecked={showVehicle}
                                onChange={handleShowVehicle}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormAddRegion;
