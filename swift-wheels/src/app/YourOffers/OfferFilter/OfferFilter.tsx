import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

import { FaFilter } from "react-icons/fa";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function FadeMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="text-primary">
            <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                <FaFilter className="ml-1 text-2xl" />
            </Button>

            <Menu
                id="fade-menu"
                MenuListProps={{
                    "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <div className="flex flex-col">
                    <FormControlLabel
                        value="start"
                        control={<Checkbox defaultChecked color="success" />}
                        label="Pending"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        value="start"
                        control={<Checkbox defaultChecked color="success" />}
                        label="Accepted"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        value="start"
                        control={<Checkbox defaultChecked color="success" />}
                        label="Declined"
                        labelPlacement="end"
                    />
                </div>
            </Menu>
        </div>
    );
}
