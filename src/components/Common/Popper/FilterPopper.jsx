import React from 'react';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import GenderDropdown from '../Input/GenderDropdown.jsx';
import TextInput from '../Input/TextInput.jsx';

function FilterPopper({ data, setData, IsOpen, anchorEl, setIsOpen,setPage}) {
    const popperFilterRef = React.useRef(null);

    const handleSelectChange = (e) => {
        const { value } = e.target;
        setData((prev) => ({
            ...prev,
            genderFilter: value,
        }));
        setPage(0);
    }

    const handleInputChange = (e) => {
        const { value } = e.target;
        setData((prev) => ({
            ...prev,
            searchInput: value,
        }));
        setPage(0);
    }

    return (
        <Popper
            ref={popperFilterRef}
            sx={{ zIndex: 1200, height: 200 }}
            open={IsOpen}
            anchorEl={anchorEl}
            placement="bottom-end"
            transition
        >
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper sx={{ border: '1px solid #2c98f0', backgroundColor: '#fff', padding: '10px 10px', height: 280, width:240, display:'flex', flexDirection: 'column'}}>
                        <h2 style={{textAlign: 'center', marginBottom: '10px'}}>Filter</h2>
                        <GenderDropdown value={data.genderFilter} status={false} action={handleSelectChange} isRequired={false}/><br/>
                        <TextInput label="search" value={data.searchInput} status={false} action={handleInputChange} />
                    </Paper>
                </Fade>
            )}
        </Popper>
    );
}

export default FilterPopper;