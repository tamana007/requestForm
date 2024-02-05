// Assuming you have a configureStore function in your store file
import { Provider } from 'react-redux';
import store from 'path-to-your-redux-store';

export default function Home() {
  return (
    <Provider store={store}>
      <main className={styles.main}>
        <TempComponent />
        {/* <DirectorReview/> */}
      </main>
    </Provider>
  );
}
