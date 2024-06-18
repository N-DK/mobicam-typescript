import { Button } from 'antd';
import { Link } from 'react-router-dom';

type Props = {
    path: string;
    name: string;
    icon: React.ReactNode;
};

const MenuItem: React.FC<Props> = ({ path, name, icon }) => {
    return (
        <Link to={path}>
            <Button type="text" className="text-[13px] rounded-full py-2 px-3">
                <div className="uppercase">{name}</div>
                {icon}
            </Button>
        </Link>
    );
};

export default MenuItem;
