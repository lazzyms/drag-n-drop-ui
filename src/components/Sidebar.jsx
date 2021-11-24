import Widget from './Widget';
import SearchBox from './SearchBox';
import { useState } from 'react';

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
    args: {
      className: 'block text-lg font-medium text-gray-700 h-8'
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
    args: {
      type: 'text',
      placeholder: 'Sample text',
      className:
        'block w-full h-8 p-2 rounded border border-gray-300 border-transparent bg-gray-50 text-lg focus:border-gray-400 focus:ring-0 sm:text-sm focus:outline-none '
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
    args: {
      type: 'button',
      className:
        'inline-flex items-center h-8 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
    }
  }
];

export default function Sidebar() {
  const [sidebarWidgets, setSidebarWidgets] = useState(widgets);
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
            <SearchBox onSearch={handleSearch} />
          </div>
          <div className='flex items-center justify-start'>
            {sidebarWidgets && sidebarWidgets.length > 0 ? (
              sidebarWidgets.map((item) => <Widget item={item} key={item.id} />)
            ) : (
              <p>No widget found for search</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
