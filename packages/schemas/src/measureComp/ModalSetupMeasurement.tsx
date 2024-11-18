import {useState} from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Modal,
    TextField
} from '@mui/material';
import {Add, Delete, ExpandLess, ExpandMore} from '@mui/icons-material';

interface Measurement {
    id: number;
    name: string;
}

interface MeasurementPoint {
    id: number;
    name: string;
    open: boolean;
    measurements: Measurement[];
}

interface MeasurementPoint {
    id: number;
    name: string;
    open: boolean;
    measurements: Measurement[];
}

interface ModalSetupMeasurementProps {
    open: boolean;
    handleClose: handleCloseProps;
}

interface handleCloseProps {
    measurementPoints: MeasurementPoint[];
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
    maxHeight: '80vh',
    overflowY: 'auto'
};

export const ModalSetupMeasurement = ({open, handleClose}: ModalSetupMeasurementProps) => {
    const [measurementPoints, setMeasurementPoints] = useState<MeasurementPoint[]>([
        {id: 0, name: "Messpunkt1", open: false, measurements: [{id: 0, name: "Messung1"}]},
    ]);

    // Hinzufügen eines neuen Messpunkts
    const handleAddMeasurementPoint = () => {
        const newMeasurementPoint = {
            id: measurementPoints.length,
            name: `Messpunkt${measurementPoints.length + 1}`,
            open: false,
            measurements: [{id: 0, name: "Messung1"}]
        };
        setMeasurementPoints([...measurementPoints, newMeasurementPoint]);
    };

    // Messpunkt umbenennen
    const handleEditMeasurementPoint = (id: number, newName: string) => {
        const updatedMeasurementPoints = measurementPoints.map((point) =>
            point.id === id ? {...point, name: newName} : point
        );
        setMeasurementPoints(updatedMeasurementPoints);
    };

    // Messungen umbenennen
    const handleEditMeasurement = (pointId: number, measurementId: number, newName: string) => {
        const updatedMeasurementPoints = measurementPoints.map((point) =>
            point.id === pointId
                ? {
                    ...point,
                    measurements: point.measurements.map((measurement) =>
                        measurement.id === measurementId ? {...measurement, name: newName} : measurement
                    )
                }
                : point
        );
        setMeasurementPoints(updatedMeasurementPoints);
    };

    // Messung hinzufügen
    const handleAddMeasurement = (pointId: number) => {
        const updatedMeasurementPoints = measurementPoints.map((point) =>
            point.id === pointId
                ? {
                    ...point,
                    measurements: [
                        ...point.measurements,
                        {id: point.measurements.length, name: `Messung${point.measurements.length + 1}`}
                    ]
                }
                : point
        );
        setMeasurementPoints(updatedMeasurementPoints);
    };

    // Messpunkt löschen
    const handleDeleteMeasurementPoint = (pointId: number) => {
        const updatedMeasurementPoints = measurementPoints.filter((point) => point.id !== pointId);
        setMeasurementPoints(updatedMeasurementPoints);
    };

    // Messung löschen
    const handleDeleteMeasurement = (pointId: number, measurementId: number) => {
        const updatedMeasurementPoints = measurementPoints.map((point) =>
            point.id === pointId
                ? {
                    ...point,
                    measurements: point.measurements.filter((measurement) => measurement.id !== measurementId)
                }
                : point
        );
        setMeasurementPoints(updatedMeasurementPoints);
    };

    // Öffnen/Schließen eines Messpunkts
    const handleToggleOpen = (id: number) => {
        const updatedMeasurementPoints = measurementPoints.map((point) =>
            point.id === id ? {...point, open: !point.open} : point
        );
        setMeasurementPoints(updatedMeasurementPoints);
    };

    return (
        <Modal open={open} onClose={() => handleClose(measurementPoints)} aria-labelledby="modal-title"
               aria-describedby="modal-description">
            <Box sx={style}>
                <List
                    sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Setup Measurement
                            <ButtonGroup variant="contained" aria-label="Basic button group" sx={{marginLeft: 2}}>
                                <Button style={{color: "white", fontWeight: 'bold'}}
                                        onClick={handleAddMeasurementPoint}>Add
                                    Messpunkt</Button>
                            </ButtonGroup>
                        </ListSubheader>
                    }
                >
                    {measurementPoints.map((measurementPoint) => (
                        <div key={measurementPoint.id}>
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete"
                                                onClick={() => handleDeleteMeasurementPoint(measurementPoint.id)}>
                                        <Delete/>
                                    </IconButton>
                                }
                            >
                                {/* Editierbarer Messpunktname */}
                                <TextField
                                    value={measurementPoint.name}
                                    onChange={(e) => handleEditMeasurementPoint(measurementPoint.id, e.target.value)}
                                    label="Messpunkt"
                                    variant="outlined"
                                    size="small"
                                    sx={{width: '75%'}}
                                />
                                <ListItemButton onClick={() => handleToggleOpen(measurementPoint.id)}>
                                    {measurementPoint.open ? <ExpandLess/> : <ExpandMore/>}
                                </ListItemButton>
                            </ListItem>
                            <Collapse in={measurementPoint.open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {measurementPoint.measurements.map((measurement) => (
                                        <ListItem
                                            key={measurement.id}
                                            sx={{pl: 4}}
                                            secondaryAction={
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => handleDeleteMeasurement(measurementPoint.id, measurement.id)}
                                                >
                                                    <Delete/>
                                                </IconButton>
                                            }
                                        >
                                            {/* Editierbare Messung */}
                                            <TextField
                                                value={measurement.name}
                                                onChange={(e) =>
                                                    handleEditMeasurement(
                                                        measurementPoint.id,
                                                        measurement.id,
                                                        e.target.value
                                                    )
                                                }
                                                label="Messung"
                                                variant="outlined"
                                                size="small"
                                                sx={{width: '100%'}}
                                            />
                                        </ListItem>
                                    ))}
                                    <ListItem sx={{pl: 4}}>
                                        {/* Button zum Hinzufügen einer neuen Messung */}
                                        <IconButton onClick={() => handleAddMeasurement(measurementPoint.id)}>
                                            <Add/>
                                        </IconButton>
                                        <ListItemText primary="Messung hinzufügen"/>
                                    </ListItem>
                                </List>
                            </Collapse>
                        </div>
                    ))}
                </List>
            </Box>
        </Modal>
    );
};
