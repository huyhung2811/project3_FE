import React from 'react';
import Grid from '@mui/material/Grid';
import DetailsItem from './DetailsItem';

export default function DetailsTab({ courseClassDetails }) {
    return (
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {Object.entries(courseClassDetails).map(([key, value], index) => {
                if (key !== 'students' && key !== 'class_id') {
                    return (
                        <Grid item xs={3} key={index}>
                            <DetailsItem label={key} value={value} />
                        </Grid>
                    );
                }
                return null;
            })}
        </Grid>
    );
}