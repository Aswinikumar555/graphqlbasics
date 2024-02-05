import { DataSource } from 'typeorm';
import { createOrmConfig } from './create-ormconfig';


const AppDataSource = (async () => {
  try {
    const ormConfig = createOrmConfig();
    return new Promise((resolve, reject) => {
      resolve(new DataSource(ormConfig));
    });
  } catch (e) {
    console.log('Error', e);
  }
})();

export default AppDataSource;
