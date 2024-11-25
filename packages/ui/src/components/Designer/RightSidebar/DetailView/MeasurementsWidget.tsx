import { Button, Form, Input, List, Select, Typography } from 'antd';
import React, { useState } from 'react';
import type { PropPanelWidgetProps } from '@pdfme/common';

interface ListItem {
    id: number;
    label: string;
    checked: boolean;
}

const MeasurementWidget = (props: PropPanelWidgetProps) => {
    const { changeSchemas, activeSchema } = props;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
    const [items, setItems] = useState<ListItem[]>(activeSchema.appRender.measurements || []);
    const [inputValue, setInputValue] = useState('');

    const updateSchemas = (newItems: ListItem[]) => {
        changeSchemas([{ key: 'appRender.measurements', value: newItems, schemaId: activeSchema.id }]);
    };

    const addItem = () => {
        if (inputValue.trim() !== '') {
            const newItems = [...items, { id: (items.length + 1), label: inputValue, checked: false }];
            setItems(newItems);
            setInputValue('');
            updateSchemas(newItems);
        }
    };

    const deleteItem = (id: number) => {
        const newItems = items.filter(item => item.id !== id).map((item, index) => ({ ...item, id: index + 1 }));
        setItems(newItems);
        updateSchemas(newItems);
    };

    const renderItem = (item: ListItem, index: number) => (
        <List.Item
            key={item.id}
            actions={[
                <Button key={`delete-${item.id}`} onClick={() => deleteItem(item.id)}>
                    Delete
                </Button>,
            ]}
        >
            <Typography>{`${item.id}. ${item.label}`}</Typography>
            <Select
                defaultValue={1}
                style={{ width: 120 }}
                onChange={(value) => {
                    const newItems = items.map((i) => (i.id === item.id ? { ...i, selectedValue: value } : i));
                    setItems(newItems);
                    updateSchemas(newItems);
                }}
            >
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
                <Select.Option value={3}>3</Select.Option>
            </Select>
        </List.Item>
    );

    return (
        <Form.Item>
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add new measurement"
            />
            <Button onClick={addItem} style={{ marginTop: 10 }}>
                Add Measurement
            </Button>
            <List style={{ marginTop: 20 }}>
                {items.map((item, index) => renderItem(item, index))}
            </List>
        </Form.Item>
    );
};

export default MeasurementWidget;