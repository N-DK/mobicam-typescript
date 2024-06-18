import { HeaderUser } from '../../../HeaderUser';
import { Menu } from '../../../Menu';

const Header: React.FC = () => {
    return (
        <div className="z-[999]">
            <div className="flex h-12 items-center w-full shadow-sm px-4 justify-between">
                <div className="h-[80%]">
                    <img
                        src="https://my.mobicam.vn/static/images/logoHead.png"
                        alt="logo"
                        className="w-full h-full"
                    />
                </div>
                <Menu />
                <HeaderUser />
            </div>
        </div>
    );
};

export default Header;
