import Widget from './Widget';
import SearchBox from './SearchBox';
import { useState } from 'react';

// The default widgets json for sidebar and actual element on canvas
const widgets = [
  {
    id: 1,
    label: (
      <img
        alt='label'
        height='24px'
        width='24px'
        src='https://app.appsmith.com/static/media/icon.97c59b52.svg'
      />
    ),
    type: 'label',
    name: 'Text',
    inDropArea: false,
    style: {
      height: 32,
      width: 48
    },
    args: {
      className: 'c-label'
    }
  },
  {
    id: 2,
    label: (
      <img
        alt='input'
        height='24px'
        width='24px'
        src='https://app.appsmith.com/static/media/icon.9f505595.svg'
      />
    ),
    type: 'input',
    name: 'Input',
    inDropArea: false,
    style: {
      height: 32,
      width: 160
    },
    args: {
      type: 'text',
      placeholder: 'Sample text',
      className:
        'c-input '
    }
  },
  {
    id: 3,
    label: (
      <img
        alt='button'
        height='24px'
        width='24px'
        src='https://app.appsmith.com/static/media/icon.cca02633.svg'
      />
    ),
    type: 'button',
    name: 'Button',
    inDropArea: false,
    style: {
      height: 32,
      width: 64
    },
    args: {
      type: 'button',
      className:
        'c-button'
    }
  }
];

export default function Sidebar() {
  // Setting a state var for widget to mutate it for search
  const [sidebarWidgets, setSidebarWidgets] = useState(widgets);

  // Search widget by name
  const handleSearch = (e) => {
    if (e.target.value) {
      setSidebarWidgets([
        ...widgets.filter((item) => {
          if (item.type.indexOf(e.target.value) >= 0) {
            return true;
          } else {
            return false;
          }
        })
      ]);
    } else {
      setSidebarWidgets(widgets);
    }
  };

  return (
    <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 shadow-xl'>
      <div className='flex-1 flex flex-col min-h-0'>
        <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
          <div className='flex items-center flex-shrink-0 px-1'>
            {/* Search input box */}
            <SearchBox onSearch={handleSearch} />
          </div>
          <div className='flex items-center'>
            {/* Draggable widget icons component */}
            {sidebarWidgets && sidebarWidgets.length > 0 ? (
              sidebarWidgets.map((item) => <Widget item={item} key={item.id} />)
            ) : (
              <p className='m-2 text-xs text-gray-500 text-center'>
                Oops!! No widget matching your search...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
