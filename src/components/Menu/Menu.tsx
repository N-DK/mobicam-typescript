import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItem } from '../MenuItem';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import {
    GeoAreaIcon,
    GirdIcon,
    ImageIcon,
    RouteIcon,
    VideoIcon,
} from '../../icons';

type MenuType = {
    path: string;
    name: string;
    icon: React.ReactNode;
    items?: MenuProps['items'];
};

const menu: MenuType[] = [
    {
        path: '/online',
        name: 'giám sát',
        icon: null,
        items: [],
    },
    {
        path: '',
        name: 'Xem lại',
        icon: <FontAwesomeIcon icon={faChevronDown} />,
        items: [
            {
                label: (
                    <Link
                        to="/online"
                        className="w-full flex items-center py-2"
                    >
                        <RouteIcon />
                        <span className="ml-2">Lộ trình</span>
                    </Link>
                ),
                key: '0',
            },
            {
                label: (
                    <Link
                        to="/online"
                        className="w-full flex items-center py-2"
                    >
                        <ImageIcon />
                        <span className="ml-2">Hình ảnh</span>
                    </Link>
                ),
                key: '1',
            },
            {
                label: (
                    <Link
                        to="/online"
                        className="w-full flex items-center py-2"
                    >
                        <VideoIcon />
                        <span className="ml-2">Video</span>
                    </Link>
                ),
                key: '2',
            },
        ],
    },
    {
        path: '/online',
        name: 'báo cáo',
        icon: null,
        items: [],
    },
    {
        path: '/online',
        name: 'quản trị',
        icon: null,
        items: [],
    },
    {
        path: '/online',
        name: 'tính năng',
        icon: <FontAwesomeIcon icon={faChevronDown} />,
        items: [
            {
                label: (
                    <Link
                        to="/online"
                        className="w-full flex items-center py-2"
                    >
                        <GirdIcon />
                        <span className="ml-2">Giám sát nhiều phương tiện</span>
                    </Link>
                ),
                key: '0',
            },
            {
                label: (
                    <Link
                        to="/online"
                        className="w-full flex items-center py-2"
                    >
                        <GeoAreaIcon />
                        <span className="ml-2">Vùng địa lý</span>
                    </Link>
                ),
                key: '1',
            },
        ],
    },
];

const Menu: React.FC = () => {
    return (
        <div>
            <div className="flex items-center">
                {menu.map((item, index) => (
                    <Dropdown
                        key={index}
                        menu={{ items: item.items }}
                        trigger={['click']}
                        placement="bottom"
                    >
                        <div>
                            <MenuItem
                                path={item.path}
                                name={item.name}
                                icon={item.icon}
                            />
                        </div>
                    </Dropdown>
                ))}
            </div>
        </div>
    );
};

export default Menu;
