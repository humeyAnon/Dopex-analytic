import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import bg from '../Images/background.jpg'
import b from '../Images/2.svg'

const SideBar = () => {

    return (
            <ProSidebar collapsed={false} breakPoint='md' style={{background:'#0c1e35'}} image={b}>
                <Menu iconShape="square">
                    <MenuItem></MenuItem>
                        <SubMenu title="Ssovs">
                            <MenuItem>Eth</MenuItem>
                            <MenuItem>Dpx</MenuItem>
                            <MenuItem>Rdpx</MenuItem>
                        </SubMenu>
                </Menu>
            </ProSidebar>
    )
}


export default SideBar;
