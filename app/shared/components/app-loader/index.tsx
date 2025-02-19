import { OrbitProgress } from 'react-loading-indicators';

import './styles.scss';

function AppLoader() {
  return (
    <div className="loader">
      <OrbitProgress variant="spokes" color="#f3f3f3" size="small" />
    </div>
  );
}

export default AppLoader;
