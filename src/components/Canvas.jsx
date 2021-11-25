import { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import Widget from './Widget';

export default function Canvas() {
  const [board, setBoard] = useState([]);
  const boardRef = useRef(null);
  const snapToGrid = ({ x, y }) => {
    const snappedX = Math.round(x / 32) * 32;
    const snappedY = Math.round(y / 32) * 32;
    return { x: snappedX, y: snappedY };
  };

  const isColliding = (object_1, object_2) =>
    object_1.left < object_2.left + object_2.width &&
    object_1.left + object_1.width > object_2.left &&
    object_1.top < object_2.top + object_2.height &&
    object_1.top + object_1.height > object_2.top;

  const updateItem = (object_1, object_2, wids) => {
    if (isColliding(object_1, object_2)) {
      wids.bg = 'red';
      wids.border = '1px solid red';
    } else {
      wids.bg = '';
      wids.border = '';
    }
    return wids;
  };
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: 'BOX',
      drop: (item, monitor) => {
        const alpha = snapToGrid(monitor.getSourceClientOffset());
        const top = alpha.y;
        const left = alpha.x;

        if (item.inDropArea) {
          setBoard((boardItems) => {
            return boardItems.map((boardItem) => {
              if (boardItem.key === item.key) {
                return { ...boardItem, top, left };
              }
              return boardItem;
            });
          });
        } else {
          setBoard((items) => [
            ...items,
            {
              ...item,
              key: uuidv4(),
              args: { ...item.args },
              inDropArea: true,
              top,
              left
            }
          ]);
        }

        return;
      },
      canDrop: (item, monitor) => {
        if (board && board.length > 0) {
          const alpha = snapToGrid(monitor.getSourceClientOffset());
          const object_1 = {
            left: alpha.x,
            top: alpha.y,
            height: item.style.height,
            width: item.style.width
          };
          let shouldDrop = false;
          board.every((wids) => {
            const object_2 = {
              left: wids.left,
              top: wids.top,
              height: wids.style.height,
              width: wids.style.width
            };
            if (item.inDropArea) {
              if (item.key !== wids.key) {
                shouldDrop = !isColliding(object_1, object_2);
                return false;
              } else {
                shouldDrop = true;
                return true;
              }
            } else {
              shouldDrop = !isColliding(object_1, object_2);
              return false;
            }
          });
          return shouldDrop;
        } else {
          return true;
        }
      },
      hover: (item, monitor) => {
        if (board && board.length > 0) {
          const alpha = snapToGrid(monitor.getSourceClientOffset());

          const object_1 = {
            left: alpha.x,
            top: alpha.y,
            height: item.style.height,
            width: item.style.width
          };
          setBoard((items) => {
            return items.map((wids) => {
              const object_2 = {
                left: wids.left,
                top: wids.top,
                height: wids.style.height,
                width: wids.style.width
              };
              if (item.inDropArea) {
                if (item.key !== wids.key) {
                  return updateItem(object_1, object_2, wids);
                }
                return wids;
              }
              return updateItem(object_1, object_2, wids);
            });
          });
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop()
      })
    }),
    [board]
  );

  useEffect(() => {
    if (isOver === false) {
      setBoard((items) => {
        return items.map((itm) => {
          itm.bg = '';
          itm.border = '1px solid black';
          return itm;
        });
      });
    }
  }, [isOver]);

  return (
    <div
      ref={drop}
      role={'Canvas'}
      style={{ opacity: isOver ? 0.7 : 1 }}
      className='h-full z-10 drop-area rounded border-2 border-gray-200'
    >
      {!board.length && (
        <span className='flex justify-center items-center h-full font-bold text-lg text-gray-500 text-center'>
          {canDrop ? 'Release to drop' : 'Drag and Drop widget here'}
        </span>
      )}
      <div ref={boardRef}>
        {board && board.map((item) => <Widget key={item.key} item={item} />)}
      </div>
    </div>
  );
}
