
import LoginCard from "./LoginCard";
export const metadata = {
  title: 'HRIS-Login',
};

export function page() {
  return (
    <main className='h-screen'>
      <section className="h-full bg-gray-50 ">
        <div className="pt-24 mx-auto  w-5/6 sm:w-1/2 md:w-1/2 lg:w-1/4 mt-0">
          <LoginCard />
        </div>
      </section>
    </main>
  );
};


export default page;
