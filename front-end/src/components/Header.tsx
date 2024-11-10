import { AppBar, Toolbar, Typography, styled } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const ToolBarTypography = styled(Typography)(() => ({
    flex: 1,
}));

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <ToolBarTypography>コドン最適化ツール</ToolBarTypography>
                <AccountCircleOutlinedIcon />
            </Toolbar>
        </AppBar>
    )
}
export default Header;