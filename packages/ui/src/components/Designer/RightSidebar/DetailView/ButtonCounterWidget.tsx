import {Button, Form, Input, List, Typography} from 'antd';
import React, { useState } from 'react';
import type { PropPanelWidgetProps } from '@pdfme/common';

interface ListItem {
    id: number;
    label: string;
    checked: boolean;
}

const ButtonCounterWidget = (props: PropPanelWidgetProps) => {
    const { changeSchemas, activeSchema } = props;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
    const [items, setItems] = useState<ListItem[]>(activeSchema.appRender.buttons || []);
    const [inputValue, setInputValue] = useState('');

    const updateSchemas = (newItems: ListItem[]) => {
        changeSchemas([{ key: 'appRender.buttons', value: newItems, schemaId: activeSchema.id }]);
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

    const moveItem = (index: number, direction: number) => {
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= items.length) return;
        const newItems = [...items];
        const [movedItem] = newItems.splice(index, 1);
        newItems.splice(newIndex, 0, movedItem);
        const updatedItems = newItems.map((item, idx) => ({ ...item, id: idx + 1 }));
        setItems(updatedItems);
        updateSchemas(updatedItems);
    };

    const renderItem = (item: ListItem, index: number) => (
        <List.Item
            key={item.id}
            actions={[
                <Button key={`delete-${item.id}`} onClick={() => deleteItem(item.id)}>
                    Delete
                </Button>,
                <Button key={`up-${item.id}`} onClick={() => moveItem(index, -1)} disabled={index === 0}>
                    Up
                </Button>,
                <Button key={`down-${item.id}`} onClick={() => moveItem(index, 1)} disabled={index === items.length - 1}>
                    Down
                </Button>,
            ]}
        >
            <Typography>{`${item.id}. ${item.label}`}</Typography>
        </List.Item>
    );

    return (
        <Form.Item>
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add new button"
            />
            <Button onClick={addItem} style={{ marginTop: 10 }}>
                Add Button
            </Button>
            <List style={{ marginTop: 20 }}>
                {items.map((item, index) => renderItem(item, index))}
            </List>
        </Form.Item>
    );
};

export default ButtonCounterWidget;
