import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';

const HeaderUser: React.FC = () => {
    return (
        <div>
            <div className="flex items-center">
                <div className="relative mr-4">
                    <Button
                        className="rounded-full"
                        type="text"
                        icon={<BellOutlined />}
                    ></Button>
                    <span className="absolute text-[12px] bg-[#ec5b56] px-4 rounded-full text-white top-0 -right-3 w-6 flex justify-center items-center">
                        99
                        <FontAwesomeIcon className="text-[8px]" icon={faPlus} />
                    </span>
                </div>
                <Button type="text" className="rounded-full px-[6px]">
                    <div className="rounded-full flex justify-center items-center w-6 h-6 bg-[#e6effd]">
                        <UserOutlined />
                    </div>
                    <span className="uppercase font-medium">midvn</span>
                    <FontAwesomeIcon icon={faChevronDown} />
                </Button>
            </div>
        </div>
    );
};

export default HeaderUser;
