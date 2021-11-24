import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';

function AppOld() {
  return (
    <div>
      <Sidebar />

      <div className='md:pl-64'>
        <div className='m-2 bg-gray-100 h-screen flex flex-col'>
          <main className='flex-1 '>
            <Canvas />
          </main>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <Sidebar />

      <div className='md:pl-64'>
        <div className='m-2 bg-gray-100 h-screen flex flex-col'>
          <main className='flex-1 '>
            <Canvas />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
