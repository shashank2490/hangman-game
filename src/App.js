import styles from './App.module.scss';
import HangManGame from './HangManGame';

function App({history}) {
  return (
    <div className={styles.App}>
      <HangManGame />
    </div>
  );
}

export default App;
