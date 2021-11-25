import { useDrag } from 'react-dnd';

// common style for canvas widget
const dropAreaWidgetStyle = (item) => {
  return {
    position: 'absolute',
    zIndex: 50,
    top: item.top,
    left: item.left,
    height: `${item.style.height + 0.8}px`,
    width: `${item.style.width + 0.8}px`,
    backgroundColor: item.bg,
    border: item.border ? item.border : '1px solid black',
    padding: '1px 3px'
  };
};

export default function Widget({ item }) {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'BOX',
    item: item,
    options: {
      dropEffect: item.inDropArea ? 'move' : 'copy'
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <>
      {item.inDropArea ? (
        // Draggable canvas widget
        <div
          role='Handle'
          data-key={item.key}
          ref={(node) => drag(preview(node))}
          style={{
            ...dropAreaWidgetStyle(item),
            opacity: isDragging ? 0.5 : 1
          }}
        >
          {/* Conditional form element rendering */}
          {item.type === 'label' ? (
            <label {...item.args}>{item.name}</label>
          ) : item.type === 'input' ? (
            <input {...item.args} />
          ) : (
            <button {...item.args}>{item.name}</button>
          )}
        </div>
      ) : (
        // Draggable icon widget
        <>
          <div
            role='Handle'
            ref={(node) => drag(preview(node))}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className='icon-handle'
          >
            <div className='inline-flex items-center justify-center h-10 w-10'>
              {item.label}
            </div>
            <span className='text-sm uppercase'>{item.name}</span>
          </div>
        </>
      )}
    </>
  );
}
