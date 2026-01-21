import { redirect } from 'next/navigation';
import { trekName } from '@/constants/redirectTrekName';

const HomePage = () => {
  redirect(trekName.Link);
  return (
    <div >
      <span>trekly home page </span>
    </div>
  );
}

export default HomePage;