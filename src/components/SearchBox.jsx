import SearchIcon from './SearchIcon';

export default function SearchBox({ onSearch }) {
  return (
    <div>
      <div className='mt-1 flex rounded-md shadow-sm'>
        <div className='relative flex items-stretch flex-grow focus-within:z-10'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <SearchIcon size={16} color='gray' />
          </div>
          <input
            type='text'
            name='search'
            id='search'
            className='block pl-10 w-full h-8 border-0 border-b border-transparent bg-red-50 focus:border-red-600 focus:ring-0 sm:text-sm focus:outline-none'
            placeholder='Search widgets...'
            onChange={onSearch}
          />
        </div>
      </div>
      <p className='mt-2 text-sm text-gray-500'>
        Drag a widget and drop it on canvas.
      </p>
    </div>
  );
}
