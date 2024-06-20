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
import { createClusterCustomIcon, localLangue } from '../../utils';
import TextArea from 'antd/es/input/TextArea';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { getListVehicles } from '../../services/carService';
import { FeatureGroup as LeafletFeatureGroup } from 'leaflet';
import L from 'leaflet';

Object.assign(L.drawLocal, localLangue);
L.Edit.Circle.include({
    _resize(latlng: any) {
        var moveLatLng = this._moveMarker.getLatLng();
        var radius;
        if (L.GeometryUtil.isVersion07x()) {
            radius = moveLatLng.distanceTo(latlng);
        } else {
            radius = this._map.distance(moveLatLng, latlng);
        }
        this._shape.setRadius(radius);

        if (this._map.editTooltip) {
            this._map._editTooltip.updateContent({
                text:
                    L.drawLocal.edit.handlers.edit.tooltip.subtext +
                    '<br />' +
                    L.drawLocal.edit.handlers.edit.tooltip.text,
                subtext:
                    L.drawLocal.draw.handlers.circle.radius +
                    ': ' +
                    L.GeometryUtil.readableDistance(
                        radius,
                        true,
                        this.options.feet,
                        this.options.nautic,
                    ),
            });
        }

        this._shape.setRadius(radius);

        this._map.fire(L.Draw.Event.EDITRESIZE, { layer: this._shape });
    },
});
type FormType = {
    markers: TypeCar[];
    setDisable: React.Dispatch<React.SetStateAction<boolean>>;
    setNewRegion: React.Dispatch<React.SetStateAction<Region | undefined>>;
    pendingAddRegion: boolean;
};
const rectangleOption = {
    showArea: false,
};
const { SHOW_CHILD } = TreeSelect;

type LayerType = {
    type: string;
    bounds?: number[][];
    id: number;
    center?: number[];
    radius?: number;
};

const FormAddRegion: React.FC<FormType> = ({
    markers,
    setDisable,
    setNewRegion,
    pendingAddRegion,
}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [showVehicle, setShowVehicle] = useState(true);
    const [listVehicles, setListVehicles] = useState<TypeCar[]>();
    const [name, setName] = useState<string>('');
    const [layer, setLayer] = useState<LayerType>();
    const [vehicles, setVehicles] = useState<string[]>([]);
    const [color, setColor] = useState<string>('#255DEC');
    const [isInWarning, setIsInWarning] = useState(1);
    const [isOutWarning, setIsOutWarning] = useState(1);
    const [note, setNote] = useState('');
    const featureGroupRef = useRef<LeafletFeatureGroup>(null);
    const [featureGroupComponent, setFeatureGroupComponent] =
        useState<React.ReactNode>();
    const handleShowVehicle = (checked: boolean) => {
        setShowVehicle(checked);
    };

    useEffect(() => {
        const updateNewRegion = () => {
            if (!layer) return;

            let updatedRegion;
            if (layer.type === 'circle') {
                updatedRegion = {
                    type: 'circle',
                    center: layer.center,
                    radius: layer.radius,
                };
            } else {
                updatedRegion = {
                    type: layer.type,
                    bounds: layer.bounds,
                };
            }

            setNewRegion({
                ...updatedRegion,
                color,
                name,
                isInWarning,
                isOutWarning,
                vehicles,
                note,
                isDelete: false,
            });
        };

        setDisable(!(name !== '' && layer));
        updateNewRegion();
    }, [name, layer, vehicles, color, isInWarning, isOutWarning, note]);

    const handleCreated = (e: any) => {
        const { layerType, layer } = e;
        const { _leaflet_id } = layer;
        const drawItems = featureGroupRef?.current;

        drawItems?.clearLayers();
        drawItems?.addLayer(layer);

        const newLayer: LayerType = {
            id: _leaflet_id,
            type: layerType,
        };

        if (layerType === 'circle') {
            newLayer.center = [layer._latlng.lat, layer._latlng.lng];
            newLayer.radius = layer._mRadius;
        } else {
            newLayer.bounds = layer
                .getLatLngs()[0]
                .map((latLng: any) => [latLng.lat, latLng.lng]);
        }

        setLayer(newLayer);
    };

    const handleEdited = (e: any) => {
        const {
            layers: { _layers },
        } = e;

        Object.values(_layers).forEach((layerObj: any) => {
            const { _leaflet_id, _latlng, _mRadius, _latlngs } = layerObj;

            setLayer((prev: any) => {
                if (prev?.id === _leaflet_id) {
                    if (_mRadius !== undefined) {
                        return {
                            ...prev,
                            center: [_latlng.lat, _latlng.lng],
                            radius: _mRadius,
                        };
                    } else {
                        return {
                            ...prev,
                            bounds: _latlngs[0].map((latLng: any) => [
                                latLng.lat,
                                latLng.lng,
                            ]),
                        };
                    }
                }
                return prev;
            });
        });
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
        setFeatureGroupComponent(
            <FeatureGroup ref={featureGroupRef}>
                <EditControl
                    edit={{ remove: false }}
                    draw={{
                        polygon: {
                            shapeOptions: {
                                color: color,
                            },
                        },
                        circle: {
                            shapeOptions: {
                                color: color,
                            },
                        },
                        rectangle: {
                            ...rectangleOption,
                            shapeOptions: {
                                color: color,
                            },
                        },
                        marker: false,
                        polyline: false,
                        circlemarker: false,
                    }}
                    position="topright"
                    onCreated={handleCreated}
                    onEdited={handleEdited}
                    onEditStart={() => setDisable(true)}
                    onEditStop={() => setDisable(!(name !== ''))}
                />
            </FeatureGroup>,
        );
    }, [color, name]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getListVehicles();
            setListVehicles(res?.data);
        };

        fetch();
    }, []);

    return (
        <div className="border-t border-b relative">
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
                                    showText
                                    value={color}
                                    onChangeComplete={(color) => {
                                        setColor(color.toHexString());
                                    }}
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
                                                    value: `${v.name_Vid}`,
                                                    key: `${v.name_Vid}`,
                                                }),
                                            ),
                                        },
                                    ]}
                                    value={vehicles}
                                    onChange={(value) => setVehicles(value)}
                                    treeCheckable={true}
                                    showCheckedStrategy={SHOW_CHILD}
                                    placeholder="Chọn phương tiện"
                                />
                            </Form.Item>
                            <Form.Item label="Loại cảnh báo">
                                <div className="rounded bg-[#e8e8e8] px-4 py-3 mb-3">
                                    <Checkbox
                                        onChange={(e) =>
                                            setIsInWarning(
                                                e.target.checked ? 1 : 0,
                                            )
                                        }
                                        value={isInWarning === 1}
                                        defaultChecked={isInWarning === 1}
                                    >
                                        Cảnh báo đi vào vùng
                                    </Checkbox>
                                </div>
                                <div className="rounded bg-[#e8e8e8] px-4 py-3">
                                    <Checkbox
                                        onChange={(e) =>
                                            setIsOutWarning(
                                                e.target.checked ? 1 : 0,
                                            )
                                        }
                                        checked={isOutWarning === 1}
                                        defaultChecked={isOutWarning === 1}
                                    >
                                        Cảnh báo ra khỏi vùng
                                    </Checkbox>
                                </div>
                            </Form.Item>
                            <Form.Item label="Ghi chú">
                                <TextArea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    rows={4}
                                />
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="flex-1 relative rounded overflow-hidden h-full">
                        {!loading && markers && markers?.length > 0 ? (
                            <MapWrapper
                                center={[markers[0]?.lat, markers[0]?.lng]}
                            >
                                {featureGroupComponent}
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
            {pendingAddRegion && (
                <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full flex items-center justify-center bg-gray-50 bg-opacity-50  z-[1000]">
                    <Spin
                        indicator={
                            <LoadingOutlined style={{ fontSize: 48 }} spin />
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default FormAddRegion;
