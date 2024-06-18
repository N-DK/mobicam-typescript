import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer: React.FC = () => {
    return (
        <div className="text-white h-6 flex justify-center items-center text-sm fixed right-0 left-0 bg-[#3671f6] z-[1000] transition-all bottom-0">
            <div>
                Đơn vị cung cấp: TDCORP - Tài xế công nghệ - | Hotline: | Phiên
                bản v2.0.6
            </div>
            <div className="absolute right-0 top-0 bottom-0 h-full w-10 flex justify-center items-center cursor-pointer bg-[#3671f6] z-[1000]">
                <FontAwesomeIcon icon={faChevronUp} />
            </div>
        </div>
    );
};

export default Footer;
