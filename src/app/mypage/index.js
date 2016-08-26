import MyPage from './MyPage';
import Login from './Login';

const Dashboard = ({ user }) => (
  <div>
    <h1>Congrats! Hi, {user.username}!</h1>
  </div>
);

export { MyPage, Login, Dashboard };
