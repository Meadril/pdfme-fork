import {Button, ButtonGroup, List, ListItem, ListSubheader} from "@mui/material";
import React, {useState} from "react";


interface ListItemMeasurementProps {
    measurementPoint: { id: number, name: string };
}

interface MeasurementItem {
    id: number;
    name: string;
}

export const ListItemMeasurementPoint: React.FC<ListItemMeasurementProps> = ({measurementPoint}) => {
    const [measurementItems, setMeasurementItems] = useState<MeasurementItem[]>([{id: 0, name: "Messung1"}])

    const handleAddMeasurement = (name: string) => {
        const newMeasurementItem: MeasurementItem[] = [
            ...measurementItems,
            {id: measurementItems.length++, name: name}
        ];

        setMeasurementItems(newMeasurementItem);
    }

    return (
        <List component="div" disablePadding subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button
                        onClick={() => handleAddMeasurement(`Messung${measurementItems.length + 1}`)}>Add</Button>
                    <Button
                        onClick={() => console.log("aaa")}>Delete</Button>
                </ButtonGroup>
            </ListSubheader>
        }>
            {measurementItems.map((measurementItem) => (
                <ListItem key={measurementItem.id} style={{display: 'flex', flex: 1, padding: 1}}>
                    <p>{measurementItem.name}</p>
                </ListItem>
            ))}
        </List>
    );
};
