import { Link } from 'react-router-dom';
import Empty from '../components/Empty';

export default function NotFound() {
  return <Empty title="404" sub="Страница не найдена" action={<Link to="/" className="btn">На главную</Link>} />;
}