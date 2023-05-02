import "./ListItem.scss";
import { useDrag, useDrop } from 'react-dnd';
import { useState, useRef } from "react";
import ListItem from "./ListItem";

const DraggableListItem = ({id, index, item, moveItem, removeItem}) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: "item",
        item: () => {
            console.log("id: ", id)
            console.log("index: ", index);
            return {id, index}},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    const [{handlerId}, drop] = useDrop(() => ({
        accept: "item",
        // collect: (monitor) => ({
        //     isOver: monitor.isOver(),
        //     canDrop: monitor.canDrop()
        // }),
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover: (item, monitor) => {
            if (!ref.current) return;
            
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return
            
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    }))

    const ref = useRef(null);
    const dragDropRef = drag(drop(ref));
    
    return (
        <div data-handler-id={handlerId} ref={dragDropRef} className="tracks">
            <ListItem index={index} item={item} type={item.type} handleItemClick={() => ""} removable={true} removeItem={removeItem}/>
        </div>
    )
}

export default DraggableListItem