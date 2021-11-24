import { useDrag } from 'react-dnd';

const dropAreaWidgetStyle = (item) => {
  return {
    position: 'absolute',
    zIndex: 50,
    top: item.top,
    left: item.left,
    height: '40px',
    width: '200px',
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
        <div
          role='Handle'
          data-key={item.key}
          ref={(node) => drag(preview(node))}
          style={{
            ...dropAreaWidgetStyle(item),
            opacity: isDragging ? 0.5 : 1
          }}
        >
          {item.type === 'label' ? (
            <label {...item.args}>{item.name}</label>
          ) : item.type === 'input' ? (
            <input {...item.args} />
          ) : (
            <button {...item.args}>{item.name}</button>
          )}
        </div>
      ) : (
        <>
          <div
            role='Handle'
            ref={(node) => drag(preview(node))}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className='rounded text-center items-center justify-center m-2 cursor-pointer hover:bg-gray-300'
          >
            <div className='inline-flex items-center justify-center h-10 w-10  '>
              <span className='font-medium leading-none text-red-900'>
                {item.label}
              </span>
            </div>
            <span className='text-sm text-gray-700'>{item.name}</span>
          </div>
        </>
      )}
    </>
  );
}
